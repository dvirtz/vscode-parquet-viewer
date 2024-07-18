import toArray from '@async-generators/to-array';
import { promises } from 'fs';
import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import * as tempy from 'tempy';
import * as vscode from 'vscode';
import { generateParquetRows } from '../../src/backends/parquet-backend-factory';
import { initLogger } from '../../src/logger';
import { logFolder, logLevel, setLogFolder, setLogLevel } from '../../src/settings';
import { getUri } from './utils';
import path = require('path');

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
      const contents = await toArray(generateParquetRows('parquets', parquet.fsPath));
      const logContents = await promises.readFile(logPath, 'utf-8');

      assert.equal(contents.length, 2);
      assert.match(logContents, /\{\s+"label": "parquet-viewer",\s+"level": "info",\s+"message": "opening .*small.parquet" using .* backend,\s+"time": "\S+"\s+\}/);
    });
  });
}
