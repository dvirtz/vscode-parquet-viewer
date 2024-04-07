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

if (!process.env.DEBUG_MODE)
  jest.setTimeout(60000);

jest.mock('../../src/settings', () => {
  const originalModule = jest.requireActual<typeof import('../../src/settings')>('../../src/settings');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    backend: jest.fn(),
  };
});

describe('ParquetEditorProvider', function () {
  const disposables: vscode.Disposable[] = [];
  const workspace = vscode.workspace;
  const fs = workspace.fs;
  const editorProvider = new ParquetEditorProvider;
  let testFile: vscode.Uri;

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
    const checkChanged = new Promise((resolve, reject) => {
      const callback = jest.fn(async function (editor?: vscode.TextEditor) {
        expect(editor?.document.fileName).toBe(`${testFile.fsPath}.as.json`);
        const expected = await readFile(`${name}.json`);
        expect(editor?.document.getText()).toEqual(expected);
      });
      disposables.push(vscode.window.onDidChangeActiveTextEditor(editor => callback(editor).then(_ => resolve(callback)).catch(reject)));
    });
    jest.mocked(settings.backend).mockReturnValue(backend);
    const document = await editorProvider.openCustomDocument(testFile);
    await document.open();
    await expect(checkChanged).resolves.toBeCalled();
  });

  test('updated on file change', async function () {
    jest.mocked(settings.backend).mockReturnValue('parquets');

    const small = await getUri('small.parquet');
    testFile = await copyTo('temp.parquet', small);

    const checkChanged = jest.fn(async function (document: vscode.TextDocument, name: string) {
      expect(document.fileName).toBe(`${testFile.fsPath}.as.json`);
      const expected = await readFile(`${name}.json`);
      expect(document.getText()).toEqual(expected);
    });

    const checkSmall = new Promise((resolve, reject) =>
      disposables.push(workspace.onDidOpenTextDocument(document =>
        checkChanged(document, 'small').then(_ => resolve(checkChanged)).catch(reject)
      ))
    );
    await (await editorProvider.openCustomDocument(testFile)).open();
    await expect(checkSmall).resolves.toBeCalledWith(expect.anything(), 'small');

    // make sure checkSmall is not called again
    disposables.pop()?.dispose();

    const checkLarge = new Promise((resolve, reject) =>
      disposables.push(workspace.onDidChangeTextDocument(event =>
        checkChanged(event.document, 'large').then(_ => resolve(checkChanged)).catch(reject)
      ))
    );
    await fs.copy(await getUri('large.parquet'), testFile, { overwrite: true });

    await expect(checkLarge).resolves.toHaveBeenLastCalledWith(expect.anything(), 'large');
  });

  test('handles error', async function () {
    const parquet = await getUri(`version_2.parquet`);
    testFile = await copyTo(`version_2-parquets.parquet`, parquet);
    const checkChanged = new Promise((resolve, reject) => {
      const callback = jest.fn(async function (editor?: vscode.TextEditor) {
        expect(editor?.document.fileName).toBe(`${testFile.fsPath}.as.json`);
        expect(editor?.document.getText()).toMatch(new RegExp(`{\\"error\\":\\"while reading ${testFile.fsPath.replace(/\\/g, '\\\\\\\\')}: .*\\"}`));
      });
      disposables.push(vscode.window.onDidChangeActiveTextEditor(editor => callback(editor).then(_ => resolve(callback)).catch(reject)));
    });
    jest.mocked(settings.backend).mockReturnValue('parquets');
    const document = await editorProvider.openCustomDocument(testFile);
    await document.open();
    await expect(checkChanged).resolves.toBeCalled();
  });
});
