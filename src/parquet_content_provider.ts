import { TextDocumentContentProvider, EventEmitter, Uri, window, workspace } from "vscode";
import { spawn, ChildProcess } from "child_process";
import * as path from 'path';
import * as assert from 'assert';

class Json {
  data: string = "";
}

export class ParquetContentProvider implements TextDocumentContentProvider {

  private jsons: Map<string, Json> = new Map();

  // emitter and its event
  onDidChangeEmitter = new EventEmitter<Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  static spawnParquetTools(params: string[]): Thenable<ChildProcess> {
    var parquetTools = workspace.getConfiguration('parquet-viewer').get<string>('parquetToolsPath')!;

    return new Promise<ChildProcess>((resolve, reject) => {
      if (parquetTools.endsWith('.jar')) {
        if (!path.isAbsolute(parquetTools)) {
          workspace.findFiles(parquetTools).then(files => {
            assert(files.length === 1);
            resolve(spawn('java', ['-jar', files[0].fsPath].concat(params)));
          },
          reason => reject(reason));
        }
        else {
          resolve(spawn('java', ['-jar', parquetTools].concat(params)));
        }
      }
      else {
        resolve(spawn(parquetTools, params));
      }
    });
  }

  async provideTextDocumentContent(uri: Uri): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {

      const path = uri.fsPath.replace(RegExp('\.as\.json$'), '');

      if (this.jsons.has(path)) {
        resolve(this.jsons.get(path)!.data);
      }

      var json = new Json;
      this.jsons.set(path, json);

      ParquetContentProvider.spawnParquetTools(['cat', '-j', path]).then(parquet_tools => {
        // parquet_tools.stdout.pipe(stream)
        var stderr: string = "";
        parquet_tools.stderr.on('data', (data: string) => {
          stderr += data;
        });
        parquet_tools.stdout.on('data', (data: string) => {
          json.data += data;
          this.onDidChangeEmitter.fire(uri);
        });

        parquet_tools.on('close', (code: any) => {
          if (code) {
            const message = `error when running parquet-tools ${code}:\n${stderr}`;
            window.showErrorMessage(message);
            reject(message);
          }

          resolve(json.data);
        });
      },
      reason => {
        reject(reason);
      });
    });
    
  }

}