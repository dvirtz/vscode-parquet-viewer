import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { ArrowBackend } from './arrow-backend';
import { ParquetToolsBackend } from './parquet-tools-backend';
import { ParquetsBackend } from './parquets-backend';
import { backend } from './settings';
import { assert } from 'console';
import { promises } from 'fs';
import { getLogger } from './logger';

export default class ParquetDocument implements vscode.Disposable {
  private readonly _uri: vscode.Uri;
  private readonly _emitter: vscode.EventEmitter<vscode.Uri>;

  private _lines: string[] = [];
  private readonly _disposables: vscode.Disposable[] = [];
  private readonly _parquetPath: string;
  private _lastMod = 0;
  private readonly _backend = (() => {
    switch (backend()) {
      case 'parquet-tools':
        return new ParquetToolsBackend;
      case 'parquets':
        return new ParquetsBackend;
      default:
        return new ArrowBackend;
    }
  })();


  private constructor(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>) {
    this._uri = uri;
    this._emitter = emitter;
    this._parquetPath = this._uri.fsPath.replace(/\.as\.json$/, '');
    const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(this._parquetPath, "*"));
    this._disposables.push(watcher);
    this._disposables.push(watcher.onDidChange(async uri => {
      assert(uri.fsPath == this._parquetPath);
      return await this.populate();
    }));
    this._disposables.push(watcher.onDidCreate(async uri => {
      assert(uri.fsPath == this._parquetPath);
      return await this.populate();
    }));
  }

  dispose() {
    for (const disposable of this._disposables) {
      disposable.dispose();
    }
  }

  public static async create(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>): Promise<ParquetDocument> {
    const parquet = new ParquetDocument(uri, emitter);
    await parquet.populate();
    return parquet;
  }

  get value() {
    return this._lines.join(os.EOL) + os.EOL;
  }

  private async populate() {
    // protect against onCreate firing right after create
    try {
      const {mtimeMs} = await promises.stat(this._parquetPath);
      if (mtimeMs == this._lastMod) {
        getLogger().debug("skipping populate() as modification timestamp hasn't changed");
        return;
      }
      this._lastMod = mtimeMs;
    } catch (err) {
      getLogger().warn(`failed populating ${this._parquetPath}: ${err}`);
    }

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
