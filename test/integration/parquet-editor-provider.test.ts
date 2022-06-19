import * as vscode from 'vscode';
import { ParquetTextDocumentContentProvider } from "../../src/parquet-document-provider";
import { ParquetEditorProvider } from "../../src/parquet-editor-provider";
import * as settings from '../../src/settings';
import { getUri, readFile, deferred } from "./utils";
import * as path from 'path';

jest.mock('../../src/settings', () => {
  const originalModule = jest.requireActual('../../src/settings');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    useParquetTools: jest.fn(),
  };
});

describe('ParquetEditorProvider', function () {
  const disposables: vscode.Disposable[] = [];
  const workspace = vscode.workspace;
  const fs = workspace.fs;
  const editorProvider = new ParquetEditorProvider;

  beforeEach(async function () {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    disposables.push(
      workspace.registerTextDocumentContentProvider('parquet', new ParquetTextDocumentContentProvider)
    );
  });

  afterEach(function () {
    for (const disposable of disposables) {
      disposable.dispose();
    }
  });

  test.each([
    ['small', true],
    ['large', false]
  ])('shows parquet using parquet tools %p', async function (name, useParquetTools) {
    const parquet = await getUri(`${name}.parquet`);
    const checkChanged = jest.fn(async function (document: vscode.TextDocument) {
      expect(document.fileName).toBe(`${parquet.fsPath}.as.json`);
      const expected = await readFile(`${name}.json`);
      expect(document.getText()).toEqual(expected);
    });
    disposables.push(workspace.onDidOpenTextDocument(checkChanged));
    jest.mocked(settings.useParquetTools).mockReturnValue(useParquetTools);
    const document = await editorProvider.openCustomDocument(parquet);
    await document.open();
    expect(checkChanged).toBeCalled();
  });

  test('updated on file change', async function () {
    const small = await getUri('small.parquet');
    const temp = vscode.Uri.file(path.join(path.dirname(small.fsPath), 'temp.parquet'));
    await fs.copy(small, temp, { overwrite: true });

    const checkChanged = jest.fn(async function (document: vscode.TextDocument, name: string) {
      expect(document.fileName).toBe(`${temp.fsPath}.as.json`);
      const expected = await readFile(`${name}.json`);
      expect(document.getText()).toEqual(expected);
    });

    const checkSmall = workspace.onDidOpenTextDocument(async document => {
      await checkChanged(document, 'small');
    });
    await (await editorProvider.openCustomDocument(temp)).open();
    checkSmall.dispose();

    const {promise, resolve} = deferred<void>();

    const checkLarge = workspace.onDidChangeTextDocument(async event => {
      await checkChanged(event.document, 'large');
      resolve();
    });
    await fs.copy(await getUri('large.parquet'), temp, { overwrite: true });

    await promise;

    checkLarge.dispose();

    expect(checkChanged).toBeCalledTimes(2);

    await workspace.fs.delete(temp);
  });
});
