import * as vscode from 'vscode';
import { ParquetTextDocumentContentProvider } from "../../src/parquet-document-provider";
import { ParquetEditorProvider } from "../../src/parquet-editor-provider";
import * as settings from '../../src/settings';
import { getUri, readFile } from "./utils";
import * as path from 'path';

jest.mock('../../src/settings', () => {
  const originalModule = jest.requireActual('../../src/settings');

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
    disposables.push(
      workspace.registerTextDocumentContentProvider('parquet', new ParquetTextDocumentContentProvider)
    );
  });

  afterEach(async function () {
    while (disposables.length) {
      disposables.pop()?.dispose();
    }
    await workspace.fs.delete(testFile);
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

  test.each<[string, settings.Backend]>([
    ['small', 'parquet-tools'],
    ['small', 'parquets'],
    ['small', 'arrow'],
    ['large', 'parquets']
  ])('shows %p using %p', async function (name, backend) {
    const parquet = await getUri(`${name}.parquet`);
    testFile = await copyTo(`${name}-${backend}.parquet`, parquet);
    const checkChanged = new Promise(resolve => {
      const callback = jest.fn(async function (editor?: vscode.TextEditor) {
        expect(editor?.document.fileName).toBe(`${testFile.fsPath}.as.json`);
        const expected = await readFile(`${name}.json`);
        expect(editor?.document.getText()).toEqual(expected);
        resolve(callback);
      });
      disposables.push(vscode.window.onDidChangeActiveTextEditor(callback));
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

    const checkSmall = new Promise(resolve =>
      disposables.push(workspace.onDidOpenTextDocument(async document => {
        await checkChanged(document, 'small');
        resolve(checkChanged);
      })));
    await (await editorProvider.openCustomDocument(testFile)).open();
    await expect(checkSmall).resolves.toBeCalledWith(expect.anything(), 'small');

    // make sure checkSmall is not called again
    disposables.pop()?.dispose();

    const checkLarge = new Promise(resolve => disposables.push(workspace.onDidChangeTextDocument(async event => {
      await checkChanged(event.document, 'large');
      resolve(checkChanged);
    })));
    await fs.copy(await getUri('large.parquet'), testFile, { overwrite: true });

    await expect(checkLarge).resolves.toHaveBeenLastCalledWith(expect.anything(), 'large');
  });
});
