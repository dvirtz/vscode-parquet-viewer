import * as vscode from "vscode";
import * as assert from 'assert';

export class ParquetTextDocumentContentProvider implements vscode.TextDocumentContentProvider {
  private static jsonMap: Map<string, string> = new Map();

  public static has(path: string): boolean {
    return ParquetTextDocumentContentProvider.jsonMap.has(path);
  }

  public static add(path:string, content: string): void {
    ParquetTextDocumentContentProvider.jsonMap.set(path, content);
  }

  onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  async provideTextDocumentContent(uri: vscode.Uri): Promise<string | undefined> {
    const parquetPath = uri.fsPath.replace(/\.as\.json$/, '');
    assert(ParquetTextDocumentContentProvider.has(parquetPath));
    return ParquetTextDocumentContentProvider.jsonMap.get(parquetPath);
  }
}
