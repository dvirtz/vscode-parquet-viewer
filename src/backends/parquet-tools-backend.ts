import { strict as assert } from 'assert';
import { spawn } from "child_process";
import { Readable } from 'node:stream';
import * as path from 'path';
import split2 from 'split2';
import * as vscode from 'vscode';
import { getLogger } from '../logger';
import { parquetTools as getParquetTools } from '../settings';

export async function parquetToolsBackend(path: string, token?: vscode.CancellationToken): Promise<Readable> {

  return Readable.from(generateParquetRows(path, token));
}

async function* generateParquetRows(path: string, token?: vscode.CancellationToken) {
  const [command, ...args] = await parquetToolsPath();
  getLogger().debug(`spawning ${command} cat -j ${path}`);
  const childProcess = spawn(command, args.concat(['cat', '-j', path]));

  token?.onCancellationRequested(_ => {
    childProcess.kill();
  });
  let stderr = '';
  childProcess.stderr.on('data', data => stderr += data);

  yield* childProcess.stdout.pipe(split2(JSON.parse));

  const exitCode = await new Promise<number>((resolve) => {
    childProcess.on('exit', (code) => {
      resolve(code || 0);
    });
  });

  if (exitCode != 0 && !token?.isCancellationRequested) {
    throw new Error(`parquet-tools exited with code ${exitCode}\n${stderr}`);
  }
}

async function parquetToolsPath(): Promise<Array<string>> {
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
