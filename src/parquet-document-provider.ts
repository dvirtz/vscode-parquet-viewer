import * as vscode from "vscode";
import ParquetDocument from './parquet-document';

export class ParquetTextDocumentContentProvider implements vscode.TextDocumentContentProvider {
  private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
  private _documents = new Map<vscode.Uri, ParquetDocument>();
  private _subscriptions: vscode.Disposable;

  constructor() {
    this._subscriptions = vscode.workspace.onDidCloseTextDocument(doc => this._documents.delete(doc.uri));
  }

  dispose() {
    this._subscriptions.dispose();
    this._documents.clear();
    this._onDidChange.dispose();
  }

  get onDidChange() {
    return this._onDidChange.event;
  }

  async provideTextDocumentContent(uri: vscode.Uri): Promise<string | undefined> {
    // already loaded?
    const document = this._documents.get(uri) || (await (async _ => {
      const document = await ParquetDocument.create(uri, this._onDidChange);
      this._documents.set(uri, document);
      return document;
    })());

    return document.value;
  }
}
