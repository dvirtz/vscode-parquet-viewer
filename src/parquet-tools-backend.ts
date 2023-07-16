import * as vscode from 'vscode';
import { spawn } from "child_process";
import * as path from 'path';
import { strict as assert } from 'assert';
import { getLogger } from './logger';
import { parquetTools as getParquetTools } from './settings';
import { createInterface } from 'readline';
import { ParquetBackend } from './parquet-backend';

export class ParquetToolsBackend implements ParquetBackend {

  public static async* spawnParquetTools(params: string[], token?: vscode.CancellationToken): AsyncGenerator<string> {
    const [command, ...args] = await ParquetToolsBackend.parquetToolsPath();
    getLogger().debug(`spawning ${command} ${args.concat(params).join(' ')}`);
    const childProcess = spawn(command, args.concat(params));

    token?.onCancellationRequested(_ => {
      childProcess.kill();
    });

    childProcess.stdout.setEncoding('utf-8');
    for await (const line of createInterface({input: childProcess.stdout})) {
      yield line;
    }
    let stderr = '';
    childProcess.stderr.on('data', data => stderr += data);
    const code = await new Promise((resolve, reject) => {
      childProcess.once("error", reject);
      childProcess.on("close", (code) => {
        resolve(code);
      });
    });
    if (!token?.isCancellationRequested) {
      if (code) {
        throw new Error(`parquet-tools exited with code ${code}\n${stderr}`);
      }
    }
    return stderr;
  }

  private static async parquetToolsPath(): Promise<Array<string>> {
    let parquetTools = getParquetTools();
    if (!parquetTools) {
      throw Error(`illegal value for parquet-viewer.parquetToolsPath setting: ${parquetTools}`);
    }
    if (parquetTools.endsWith('.jar')) {
      if (!path.isAbsolute(parquetTools)) {
        const files = await vscode.workspace.findFiles(parquetTools);
        assert.equal(files.length, 1);
        parquetTools = files[0].fsPath;
      }
      return [`java`, '-jar', parquetTools];
    }
    return [parquetTools];
  }

  public async * toJson(parquetPath: string, token?: vscode.CancellationToken): AsyncGenerator<string> {
    const cancelledMessage = `parsing ${parquetPath} was cancelled by user`;
    if (token?.isCancellationRequested) {
      getLogger().info(cancelledMessage);
      return;
    }

    token?.onCancellationRequested(_ => {
      getLogger().info(cancelledMessage);
    });

    try {
      yield* ParquetToolsBackend.spawnParquetTools(['cat', '-j', parquetPath], token);
    } catch (e) {
      let message = `while reading ${parquetPath}: `;
      message += (_ => {
        if (e instanceof Error) {
          return e.message;
        }
        return `${e}`;
      })();
      getLogger().error(message);
      throw Error(message);
    }
  }
}
