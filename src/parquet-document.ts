import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { ParquetBackend } from "./parquet-backend";
import { ParquetToolsBackend } from './parquet-tools-backend';
import { ParquetsBackend } from './parquets-backend';
import { useParquetTools } from "./settings";

export default class ParquetDocument implements vscode.Disposable {
  private readonly _uri: vscode.Uri;
  private readonly _emitter: vscode.EventEmitter<vscode.Uri>;

  private _lines: string[] = [];
  private readonly _disposables: vscode.Disposable[] = [];
  private readonly _parquetPath: string;
  private readonly _backend: ParquetBackend = useParquetTools() ? new ParquetToolsBackend() : new ParquetsBackend();


  private constructor(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>) {
    this._uri = uri;
    this._emitter = emitter;
    this._parquetPath = this._uri.fsPath.replace(/\.as\.json$/, '');
    const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(this._parquetPath, "*"));
    this._disposables.push(watcher);
    this._disposables.push(watcher.onDidChange(async _ => {
      return await this._populate();
    }));
    this._disposables.push(watcher.onDidCreate(async _ => {
      return await this._populate();
    }));
  }

  dispose() {
    for (const disposable of this._disposables) {
      disposable.dispose();
    }
  }

  public static async create(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>): Promise<ParquetDocument> {
    const me = new ParquetDocument(uri, emitter);
    await me._populate();
    return me;
  }

  get value() {
    return this._lines.join(os.EOL) + os.EOL;
  }

  private async _populate() {
    const lines: string[] = [];

    try {
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `opening ${path.basename(this._parquetPath)}`,
        cancellable: true
      },
        async (progress, token) => {
          for await (const line of this._backend.toJson(this._parquetPath, token)) {
            lines.push(line);
          }
        });
    } catch (err) {
      await vscode.window.showErrorMessage(`${err}`);
    }
    if (lines != this._lines) {
      this._lines = lines;
      this._emitter.fire(this._uri);
    }
  }
}
