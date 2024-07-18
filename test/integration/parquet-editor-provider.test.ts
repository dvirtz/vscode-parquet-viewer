console.log(`node ${process.execPath} ${process.execArgv}`);
import { strict as assert } from 'node:assert';
import { Mock, test } from 'node:test';
import os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { name } from '../../package.json';
import { BackendName } from '../../src/backends/backend-name';
import { FormatterName } from '../../src/formatters/formatter-name';
import { initLogger } from '../../src/logger';
import { ParquetTextDocumentContentProvider } from "../../src/parquet-document-provider";
import { ParquetEditorProvider } from "../../src/parquet-editor-provider";
import * as settings from '../../src/settings';
import { getUri, readFile } from "./utils";

function checkMockCalled(mock: Mock<(...args: never[]) => unknown>, msg: string) {
  assert(mock.mock.callCount() > 0, msg);
}

export async function runTest() {
  await test('ParquetEditorProvider', async (context) => {
    const disposables: vscode.Disposable[] = [];
    const workspace = vscode.workspace;
    const fs = workspace.fs;
    const editorProvider = new ParquetEditorProvider;
    type TestContext = typeof context;
    const DEFAULT_BACKEND = 'parquets';
    const DEFAULT_FORMAT = 'json';

    context.beforeEach(async () => {
      await vscode.commands.executeCommand('workbench.action.closeAllEditors');
      initLogger();
      disposables.push(
        workspace.registerTextDocumentContentProvider('parquet', new ParquetTextDocumentContentProvider)
      );
      context.mock.method(settings, 'backend', () => DEFAULT_BACKEND);
      context.mock.method(settings, 'format', () => DEFAULT_FORMAT);
      context.mock.method(settings, 'jsonAsArray', () => false);
    });

    context.afterEach(async () => {
      while (disposables.length) {
        disposables.pop()?.dispose();
      }
    });

    function workspaceRoot() {
      return (workspace.workspaceFolders &&
        workspace.workspaceFolders.length > 0) ? workspace.workspaceFolders[0].uri.fsPath : '';
    }

    async function copyTo(name: string, source: vscode.Uri) {
      const uri = vscode.Uri.file(path.join(workspaceRoot(), name));
      await fs.copy(source, uri, { overwrite: true });
      disposables.push(new vscode.Disposable(() => workspace.fs.delete(uri)));
      return uri;
    }

    function registerDocumentListener<T>(event: vscode.Event<T>,
      getDocument: (t: T) => vscode.TextDocument,
      file: vscode.Uri,
      expectedContent: string | RegExp,
      context: TestContext): Promise<Mock<(document: vscode.TextDocument) => void>> {
      const listener = context.mock.fn((document: vscode.TextDocument) => {
        assert.equal(document.fileName, `${file.fsPath}.as.${settings.format()}`);
        const actual = document.getText();
        const message = [`${document.fileName} content mismatch`, 'expected', expectedContent, 'actual', actual].join('\n');
        if (typeof expectedContent === 'string') {
          assert.equal(document.getText(), expectedContent, message);
        } else {
          assert.match(document.getText(), expectedContent, message);
        }
      });
      return new Promise((resolve, reject) => {
        disposables.push(event(document => {
          try {
            listener(getDocument(document));
            resolve(listener);
          } catch (e) {
            reject(e);
          }
        }));
      });
    }

    function registerDocumentOpenedListener(file: vscode.Uri, expectedContent: string | RegExp,
      context: TestContext) {
      return registerDocumentListener(workspace.onDidOpenTextDocument, (t) => t, file, expectedContent, context);
    }

    function registerDocumentChangedListener(file: vscode.Uri, expectedContent: string | RegExp,
      context: TestContext) {
      return registerDocumentListener(workspace.onDidChangeTextDocument, (t) => t.document, file, expectedContent, context);
    }

    async function openDocument(file: vscode.Uri) {
      const document = await editorProvider.openCustomDocument(file);
      await document.open();
    }

    const tests = (() => {
      const tests: [string, BackendName, FormatterName][] = [
        ['small', 'parquets', 'json'],
        ['small', 'arrow', 'csv'],
        ['large', 'parquets', 'json'],
        ['version_2', 'arrow', 'csv'],
        ['version_2', 'parquet-wasm', 'json'],
      ];
      if (os.type() != 'Darwin' || os.arch() == 'x64') {
        return tests.concat([['small', 'parquet-tools', 'csv']]);
      }
      return tests;
    })();

    for (const [name, backend, format] of tests) {
      await context.test(`shows ${name} using ${backend} formatted as ${format}`, async function (context) {
        context.mock.method(settings, 'backend', () => backend);
        context.mock.method(settings, 'format', () => format);

        const parquet = await getUri(`${name}.parquet`);
        const testFile = await copyTo(`${name}-${backend}.parquet`, parquet);
        const expected = await readFile(`${name}.${format == 'csv' ? 'csv' : 'json'}`);
        const onDocumentOpened = registerDocumentOpenedListener(testFile, expected, context);
        await openDocument(testFile);
        checkMockCalled(await onDocumentOpened, 'onDidOpenTextDocument not called')
      });
    }


    await context.test('updated on file change', async function (context) {
      const small = await getUri('small.parquet');
      const testFile = await copyTo('temp.parquet', small);

      const smallOpened = registerDocumentOpenedListener(testFile, await readFile('small.json'), context);
      await openDocument(testFile);
      checkMockCalled(await smallOpened, 'onDidOpenTextDocument not called');

      // make sure checkSmall is not called again
      disposables.pop()?.dispose();

      const largeOpened = registerDocumentChangedListener(testFile, await readFile('large.json'), context);
      await fs.copy(await getUri('large.parquet'), testFile, { overwrite: true });
      checkMockCalled(await largeOpened, 'onDidChangeTextDocument not called');
    });

    await context.test('handles error', async function (context) {
      const parquet = await getUri(`version_2.parquet`);
      const testFile = await copyTo(`version_2-parquets.parquet`, parquet);
      const onDocumentOpened = registerDocumentOpenedListener(testFile, new RegExp(`while reading ${testFile.fsPath.replace(/\\/g, '\\\\')}: .*`), context);
      await openDocument(testFile);
      checkMockCalled(await onDocumentOpened, 'onDidOpenTextDocument not called');
    });

    await context.test('updates when settings change', async function (context) {
      type ConfigurationListener = (e: vscode.ConfigurationChangeEvent) => unknown
      let listener: ConfigurationListener = (e: vscode.ConfigurationChangeEvent) => { e };
      const onDidChangeConfiguration = context.mock.method(vscode.workspace, 'onDidChangeConfiguration', (l: ConfigurationListener) => {
        listener = l;
        return { dispose: () => undefined };
      });

      const small = await getUri('small.parquet');
      const expected = await readFile('small.json');
      const onDocumentOpened = registerDocumentOpenedListener(small, expected, context);
      await openDocument(small);

      assert(onDidChangeConfiguration.mock.callCount(), 'onDidChangeConfiguration not called');
      checkMockCalled(await onDocumentOpened, 'onDidOpenTextDocument not called');

      disposables.pop()?.dispose();

      const onDocumentChanged = registerDocumentChangedListener(small, `[${os.EOL}` + expected.split(os.EOL).filter(str => str).join(`,${os.EOL}`) + `${os.EOL}]${os.EOL}`, context);
      context.mock.method(settings, 'jsonAsArray', () => true);
      listener({ affectsConfiguration: (section: string) => section === `${name}.json.asArray` });
      checkMockCalled(await onDocumentChanged, 'onDidChangeTextDocument not called');
    });
  });
}
