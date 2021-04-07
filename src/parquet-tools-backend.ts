import * as vscode from 'vscode';
import { spawn, ChildProcess } from "child_process";
import * as path from 'path';
import * as assert from 'assert';
import { getLogger } from './logger';
import { parquetTools as getParquetTools } from './settings';

export class ParquetToolsBackend {
  public static async spawnParquetTools(params: string[]): Promise<ChildProcess> {
    let parquetTools = getParquetTools();
    if (!parquetTools) {
      throw Error(`illegal value for parquet-viewer.parquetToolsPath setting: ${parquetTools}`);
    }

    if (parquetTools.endsWith('.jar')) {
      if (!path.isAbsolute(parquetTools)) {
          const files = await vscode.workspace.findFiles(parquetTools);
          assert(files.length === 1);
          parquetTools = files[0].fsPath;
      }
      getLogger().debug(`spawning java ${['-jar', parquetTools].concat(params).join(' ')}`);
      return spawn('java', ['-jar', parquetTools].concat(params));
    }

    getLogger().debug(`spawning ${parquetTools} ${params.join(' ')}`);
    return spawn(parquetTools, params);
  }

  public static async * toJson(parquetPath: string, token?: vscode.CancellationToken): AsyncGenerator<string> {
    const cancelledMessage = `parsing ${parquetPath} was cancelled by user`;
    if (token?.isCancellationRequested) {
      getLogger().info(cancelledMessage);
      return;
    }

    const parquetTools = await ParquetToolsBackend.spawnParquetTools(['cat', '-j', parquetPath]);

    token?.onCancellationRequested(_ => {
      getLogger().info(cancelledMessage);
      parquetTools.kill();
    });

    assert(parquetTools.stdout);
    for await (const chunk of parquetTools.stdout) {
      yield chunk;
    }
    let stderr = "";
    assert(parquetTools.stderr);
    for await (const chunk of parquetTools.stderr) {
      stderr += chunk;
    }

    const exitCode = await new Promise((resolve) => {
      parquetTools.on('close', resolve);
    });

    if (exitCode && !token?.isCancellationRequested) {
      const message = `parquet-tools exited with code ${exitCode}:\n${stderr}`;
      getLogger().error(message);
      throw Error(message);
    }
  }
}
