import { TextDocumentContentProvider, EventEmitter, Uri, window } from "vscode";
import { spawn } from "child_process";
// import { Readable } from "stream";
// import { tmpdir } from "os";
// import { createWriteStream, readFile, readFileSync } from 'fs';
// import { sep } from 'path';


class Json {
  data: string = "";
}

export class ParquetContentProvider implements TextDocumentContentProvider {

  private jsons: Map<string, Json> = new Map();

  // emitter and its event
  onDidChangeEmitter = new EventEmitter<Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  async provideTextDocumentContent(uri: Uri): Promise<string> {
    return new Promise<string>((resolve, reject) => {

      const path = uri.path.replace(RegExp('\.as\.json$'), '');

      if (this.jsons.has(path)) {
        resolve(this.jsons.get(path)!.data);
      }

      var json = new Json;
      this.jsons.set(path, json);

      const parquet_tools = spawn('parquet-tools', ['cat', '-j', path]);
      // parquet_tools.stdout.pipe(stream)
      var stderr: string = "";
      parquet_tools.stderr.on('data', (data) => {
        stderr += data;
      });
      parquet_tools.stdout.on('data', (data) => {
        json.data += data;
        this.onDidChangeEmitter.fire(uri);
      });

      parquet_tools.on('close', (code) => {
        if (code) {
          const message = `error when running parquet-tools ${code}:\n${stderr}`;
          window.showErrorMessage(message);
          reject(message);
        }

        resolve(json.data);
      });
    });
  }

}