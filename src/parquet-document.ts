import assert from 'assert';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { createParquetBackend } from './backends/parquet-backend-factory';
import { createFormatter } from './formatters/formatter-factory';
import { getLogger } from './logger';
import { affectsDocument, backend } from './settings';

export default class ParquetDocument implements vscode.Disposable {
  private readonly _uri: vscode.Uri;
  private readonly _emitter: vscode.EventEmitter<vscode.Uri>;

  private _lines: string[] = [];
  private readonly _disposable: vscode.Disposable;
  private readonly _parquetPath: string;
  private _dirty = true;


  private constructor(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>) {
    this._uri = uri;
    this._emitter = emitter;
    this._parquetPath = this._uri.fsPath.replace(/\.as\.\w+$/, '');
    const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(this._parquetPath, "*"));
    this._disposable = vscode.Disposable.from(watcher,
      watcher.onDidChange(this.update.bind(this)),
      watcher.onDidCreate(this.update.bind(this)),
      vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
        if (affectsDocument(e)) {
          this.update();
        }
      })
    );
  }

  update() {
    this._dirty = true;
    this._emitter.fire(this._uri);
  }

  dispose() {
    this._disposable.dispose();
  }

  public static async create(uri: vscode.Uri, emitter: vscode.EventEmitter<vscode.Uri>) {
    const parquet = new ParquetDocument(uri, emitter);
    await parquet.tryPopulate();
    return parquet;
  }

  async value() {
    if (this._dirty) {
      await this.tryPopulate();
    }
    return `${this._lines.join(os.EOL)}${os.EOL}`;
  }

  private async tryPopulate() {
    try {
      await this.populate();
    } catch (error) {
      const message = `while reading ${this._parquetPath}: ${error}`;
      getLogger().error(message);
      void vscode.window.showErrorMessage(message);
      this._lines.push(message);
    }
  }

  private async populate() {
    assert(this._dirty, 'populate called when not dirty');

    const lines: string[] = [];
    const encoder = new TextEncoder();
    const FILE_SIZE_MB_LIMIT = 50;
    const limitExceededMsg = JSON.stringify({ warning: `file size exceeds ${FILE_SIZE_MB_LIMIT}MB limit` });
    let totalByteLength = encoder.encode(limitExceededMsg).byteLength;

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `opening ${path.basename(this._parquetPath)}`,
      cancellable: true
    },
      async (progress, token) => {
        // consume the generator to get the lines
        for await (const line of (await createParquetBackend(backend(), this._parquetPath, token)).compose(createFormatter())) {
          const lineByteLength = encoder.encode(`${line}${os.EOL}`).byteLength;
          totalByteLength += lineByteLength;
          if (totalByteLength >= FILE_SIZE_MB_LIMIT * 1024 * 1024) {
            lines.push(limitExceededMsg);
            break;
          }
          lines.push(line);
        }
      }
    );
    this._lines = lines;
    this._dirty = false;
  }
}
