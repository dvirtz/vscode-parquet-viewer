import { TextDocumentContentProvider, EventEmitter, Uri, window } from "vscode";
import { exec } from "child_process";

export class ParquetContentProvider implements TextDocumentContentProvider {

  // emitter and its event
  onDidChangeEmitter = new EventEmitter<Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  async provideTextDocumentContent(uri: Uri): Promise<string> {
    // simply invoke cowsay, use uri-path as text
    return new Promise<string>((resolve, reject) => {
      exec('parquet-tools cat -j ' + uri.path, (error, stdout, stderr) => {
        if (error) {
          const message = `error when running parquet-tools ${error}:\n${stderr}`;
          window.showErrorMessage(message);
          reject(message);
        }

        resolve(stdout);
      });
    });
  }
}