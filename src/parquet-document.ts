import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { promises } from 'fs';
import { getLogger } from './logger';
import { createParquetBackend } from './backends/parquet-backend-factory';
import { backend } from './settings';

export default class ParquetDocument implements vscode.Disposable {
  private readonly _uri: vscode.Uri;
  private readonly _emitter: vscode.EventEmitter<vscode.Uri>;

  private _lines: string[] = [];
  private readonly _disposables: vscode.Disposable[] = [];
  private readonly _parquetPath: string;
  private _lastMod = 0;
  private readonly _backend = createParquetBackend(backend());


  private constructor(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>) {
    this._uri = uri;
    this._emitter = emitter;
    this._parquetPath = this._uri.fsPath.replace(/\.as\.json$/, '');
    const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(this._parquetPath, "*"));
    this._disposables.push(watcher);
    this._disposables.push(watcher.onDidChange(this.tryPopulate.bind(this)));
    this._disposables.push(watcher.onDidCreate(this.tryPopulate.bind(this)));
  }

  dispose() {
    for (const disposable of this._disposables) {
      disposable.dispose();
    }
  }

  public static async create(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>) {
    const parquet = new ParquetDocument(uri, emitter);
    await parquet.tryPopulate();
    return parquet;
  }

  get value() {
    return this._lines.join(os.EOL) + os.EOL;
  }

  private async tryPopulate() {
    try {
      await this.populate();
    } catch (error) {
      const message = `while reading ${this._parquetPath}: ${error}`;
      getLogger().error(message);
      void vscode.window.showErrorMessage(message);
      this._lines.push(JSON.stringify({error: message}));
    }
  }

  private async populate() {
    // protect against onCreate firing right after create
    const { mtimeMs } = await promises.stat(this._parquetPath);
    if (mtimeMs == this._lastMod) {
      getLogger().debug("skipping populate() as modification timestamp hasn't changed");
      return;
    }
    this._lastMod = mtimeMs;

    const lines: string[] = [];

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `opening ${path.basename(this._parquetPath)}`,
      cancellable: true
    },
      async (progress, token) => {
        for await (const line of this._backend.toJson(this._parquetPath, token)) {
          lines.push(line);
        }
      }
    );
    if (lines != this._lines) {
      this._lines = lines;
      this._emitter.fire(this._uri);
    }
  }
}
