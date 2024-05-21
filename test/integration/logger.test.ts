import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { logLevel, logFolder, setLogFolder, setLogLevel } from '../../src/settings';
import { getUri } from './utils';
import { promises } from 'fs';
import path = require('path');
import toArray from '@async-generators/to-array';
import { ParquetsBackend } from '../../src/backends/parquets-backend';
import * as vscode from 'vscode';
import { initLogger } from '../../src/logger';
import * as tempy from 'tempy';

export async function runTest() {
  await test('Logger tests', async (context) => {
    context.afterEach(async () => {
      await setLogFolder(undefined);
      await setLogLevel('debug');
    });

    await context.test('log level', async () => {
      assert.equal(logLevel(), 'debug');
      await setLogLevel('fatal');
      assert.equal(logLevel(), 'fatal');
    });

    await context.test('log file', async () => {
      vscode.workspace.onDidChangeConfiguration(() => initLogger());

      const folder = tempy.directory();
      const logPath = path.join(folder, 'parquet-viewer.log');

      await setLogFolder(folder);
      assert.equal(logFolder(), folder);

      const parquet = await getUri('small.parquet');
      const contents = await toArray(new ParquetsBackend().generateRows(parquet.fsPath));
      const logContents = await promises.readFile(logPath, 'utf-8');

      assert.equal(contents.length, 2);
      assert.match(logContents, /\{\s+"label": "parquet-viewer",\s+"level": "info",\s+"message": "opening .*small.parquet",\s+"time": "\S+"\s+\}/);
    });
  });
}
