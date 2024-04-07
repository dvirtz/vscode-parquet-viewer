import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { BackendName } from '../../src/backends/backend-name';
import { initLogger } from '../../src/logger';
import { ParquetTextDocumentContentProvider } from "../../src/parquet-document-provider";
import { ParquetEditorProvider } from "../../src/parquet-editor-provider";
import * as settings from '../../src/settings';
import { getUri, readFile } from "./utils";
import { name } from '../../package.json';

if (!process.env.DEBUG_MODE)
  jest.setTimeout(60000);

jest.mock('../../src/settings', () => {
  const originalModule = jest.requireActual<typeof import('../../src/settings')>('../../src/settings');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    backend: jest.fn(),
    jsonAsArray: jest.fn(),
  };
});

describe('ParquetEditorProvider', function () {
  const disposables: vscode.Disposable[] = [];
  const workspace = vscode.workspace;
  const fs = workspace.fs;
  const editorProvider = new ParquetEditorProvider;
  let testFile: vscode.Uri | undefined;

  beforeEach(async function () {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    initLogger();
    disposables.push(
      workspace.registerTextDocumentContentProvider('parquet', new ParquetTextDocumentContentProvider)
    );
  });

  afterEach(async function () {
    while (disposables.length) {
      disposables.pop()?.dispose();
    }
    if (testFile) {
      await workspace.fs.delete(testFile);
      testFile = undefined;
    }
  });

  function workspaceRoot() {
    return (workspace.workspaceFolders &&
      workspace.workspaceFolders.length > 0) ? workspace.workspaceFolders[0].uri.fsPath : '';
  }

  async function copyTo(name: string, source: vscode.Uri) {
    const uri = vscode.Uri.file(path.join(workspaceRoot(), name));
    await fs.copy(source, uri, { overwrite: true });
    return uri;
  }

  function registerDocumentListener<T>(event: vscode.Event<T>, getDocument: (t: T) => vscode.TextDocument, file: vscode.Uri, expectedContent: string | RegExp) {
    const listener = jest.fn(async function (document: vscode.TextDocument) {
      expect(document.fileName).toBe(`${file.fsPath}.as.json`);
      expect(document.getText()).toMatch(expectedContent);
    });
    return new Promise((resolve, reject) => {
      disposables.push(event(document => listener(getDocument(document)).then(_ => resolve(listener)).catch(reject)));
    });
  }

  function registerDocumentOpenedListener(file: vscode.Uri, expectedContent: string | RegExp) {
    return registerDocumentListener(workspace.onDidOpenTextDocument, (t) => t, file, expectedContent);
  }

  function registerDocumentChangedListener(file: vscode.Uri, expectedContent: string | RegExp) {
    return registerDocumentListener(workspace.onDidChangeTextDocument, (t) => t.document, file, expectedContent);
  }

  async function openDocument(file: vscode.Uri) {
    const document = await editorProvider.openCustomDocument(file);
    await document.open();
  }

  const tests = (() => {
    const tests: [string, BackendName][] = [
      ['small', 'parquets'],
      ['small', 'arrow'],
      ['large', 'parquets'],
      ['version_2', 'arrow'],
      ['version_2', 'parquet-wasm'],
    ];
    if (os.type() != 'Darwin' || os.arch() == 'x64') {
      return tests.concat([['small', 'parquet-tools']]);
    }
    return tests;
  })();

  test.each(tests)('shows %p using %p', async function (name, backend) {
    const parquet = await getUri(`${name}.parquet`);
    testFile = await copyTo(`${name}-${backend}.parquet`, parquet);
    jest.mocked(settings.backend).mockReturnValue(backend);
    const onDocumentOpened = registerDocumentOpenedListener(testFile, await readFile(`${name}.json`));
    await openDocument(testFile);
    await expect(onDocumentOpened).resolves.toBeCalled();
  });

  test('updated on file change', async function () {
    jest.mocked(settings.backend).mockReturnValue('parquets');

    const small = await getUri('small.parquet');
    testFile = await copyTo('temp.parquet', small);

    const smallOpened = registerDocumentOpenedListener(testFile, await readFile('small.json'))
    await openDocument(testFile);
    await expect(smallOpened).resolves.toBeCalled();

    // make sure checkSmall is not called again
    disposables.pop()?.dispose();

    const largeOpened = registerDocumentChangedListener(testFile, await readFile('large.json'));
    await fs.copy(await getUri('large.parquet'), testFile, { overwrite: true });
    await expect(largeOpened).resolves.toBeCalled();
  });

  test('handles error', async function () {
    const parquet = await getUri(`version_2.parquet`);
    testFile = await copyTo(`version_2-parquets.parquet`, parquet);
    jest.mocked(settings.backend).mockReturnValue('parquets');
    const onDocumentOpened = registerDocumentOpenedListener(testFile, new RegExp(`{\\"error\\":\\"while reading ${testFile.fsPath.replace(/\\/g, '\\\\\\\\')}: .*\\"}`));
    await openDocument(testFile);
    await expect(onDocumentOpened).resolves.toBeCalled();
  });

  test('updates when settings change', async function () {
    let listener: (e: vscode.ConfigurationChangeEvent) => unknown = (e: vscode.ConfigurationChangeEvent) => { e };
    jest.mocked(settings.backend).mockReturnValue('parquets');
    jest.spyOn(vscode.workspace, 'onDidChangeConfiguration').mockImplementation((l) => {
      listener = l;
      return { dispose: jest.fn() };
    });

    const small = await getUri('small.parquet');
    const expected = await readFile('small.json');
    const onDocumentOpened = registerDocumentOpenedListener(small, expected);
    await openDocument(small);

    expect(vscode.workspace.onDidChangeConfiguration).toBeCalledWith(expect.any(Function));
    await expect(onDocumentOpened).resolves.toBeCalled();

    disposables.pop()?.dispose();

    const onDocumentChanged = registerDocumentChangedListener(small, `[${os.EOL}` + expected.split(os.EOL).filter(str => str).join(`,${os.EOL}`) + `${os.EOL}]`);
    jest.mocked(settings.jsonAsArray).mockReturnValue(true);
    listener({ affectsConfiguration: (section: string) => section === `${name}.json.asArray` });

    await expect(onDocumentChanged).resolves.toBeCalled();
  });
});
