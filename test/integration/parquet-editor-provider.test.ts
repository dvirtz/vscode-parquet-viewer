import { readFileSync } from 'fs';
import * as vscode from 'vscode';
import { ParquetTextDocumentContentProvider } from "../../src/parquet-document-provider";
import { ParquetEditorProvider } from "../../src/parquet-editor-provider";
import { getUri } from "./utils";
import * as settings from '../../src/settings';

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

  beforeEach(async function () {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  });

  afterEach(function () {
    for (const disposable of disposables) {
      disposable.dispose();
    }
  });

  test.each([false, true])('shows parquet using parquet tools %p', async function (useParquetTools) {
    const parquet = await getUri('small.parquet');
    const json = await getUri('small.json');
    let eventCalled = false;
    disposables.push(vscode.window.onDidChangeActiveTextEditor(testEditor => {
      if (testEditor?.document.fileName === `${parquet.fsPath}.as.json`) {
        eventCalled = true;
        expect(testEditor.document.getText()).toEqual(readFileSync(json.fsPath));
      }
    }));
    disposables.push(
      vscode.workspace.registerTextDocumentContentProvider('parquet', new ParquetTextDocumentContentProvider)
    );
    jest.mocked(settings.useParquetTools).mockReturnValue(useParquetTools);
    const document = await new ParquetEditorProvider().openCustomDocument(parquet);
    await document.show();
    expect(eventCalled).toBeTruthy();
  });
});
