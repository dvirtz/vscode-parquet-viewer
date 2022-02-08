import * as vscode from 'vscode';

export interface ParquetBackend {
  toJson(parquetPath: string, token?: vscode.CancellationToken): AsyncGenerator<string>;
}
