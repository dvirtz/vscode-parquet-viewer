import * as vscode from 'vscode';
import { spawn, ChildProcess } from "child_process";
import * as path from 'path';
import * as assert from 'assert';


export class ParquetToolsRunner {
  public static async spawnParquetTools(params: string[]): Promise<ChildProcess> {
    var parquetTools = vscode.workspace.getConfiguration('parquet-viewer').get<string>('parquetToolsPath')!;

    if (parquetTools.endsWith('.jar')) {
      if (!path.isAbsolute(parquetTools)) {
        const files = await vscode.workspace.findFiles(parquetTools);
        assert(files.length === 1);
        return spawn('java', ['-jar', files[0].fsPath].concat(params));
      }
      else {
        return spawn('java', ['-jar', parquetTools].concat(params));
      }
    }
    else {
      return spawn(parquetTools, params);
    }
  }

  public static async * toJson(parquetPath: string, token?: vscode.CancellationToken): AsyncGenerator<string> {
    if (token?.isCancellationRequested) {
      return;
    }

    const parquet_tools = await ParquetToolsRunner.spawnParquetTools(['cat', '-j', parquetPath]);

    token?.onCancellationRequested(_ => {
      parquet_tools.kill();
    });

    assert(parquet_tools.stdout);
    for await (const chunk of parquet_tools.stdout) {
      yield chunk;
    }
    var stderr: string = "";
    assert(parquet_tools.stderr);
    for await (const chunk of parquet_tools.stderr) {
      stderr += chunk;
    }

    const exitCode = await new Promise((resolve, reject) => {
      parquet_tools.on('close', resolve);
    });

    if (exitCode) {
      const message = `error when running parquet-tools ${exitCode}:\n${stderr}`;
      throw Error(message);
    }
  }
}
