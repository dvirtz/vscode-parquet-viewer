import {describe, expect, test, afterEach} from '@jest/globals';
import { logLevel, logFolder, setLogFolder, setLogLevel } from '../../src/settings';
import { getUri } from './utils';
import { promises } from 'fs';
import path = require('path');
import toArray from '@async-generators/to-array';
import { ParquetsBackend } from '../../src/backends/parquets-backend';
import * as vscode from 'vscode';
import { initLogger } from '../../src/logger';
import * as tempy from 'tempy';

describe('Logger tests', function () {
  afterEach(async function () {
    await setLogFolder(undefined);
    await setLogLevel('debug');
  });

  test('log level', async function () {
    expect(logLevel()).toBe('debug');
    await setLogLevel('fatal');
    expect(logLevel()).toBe('fatal');
  });

  test('log file', async function () {
    vscode.workspace.onDidChangeConfiguration(() => initLogger());

    const folder = tempy.directory();
    const logPath = path.join(folder, 'parquet-viewer.log');

    await setLogFolder(folder);
    expect(logFolder()).toBe(folder);

    const parquet = await getUri('small.parquet');
    const contents = await toArray(new ParquetsBackend().toJson(parquet.fsPath));
    const logContents = await promises.readFile(logPath, 'utf-8');

    expect(contents).toHaveLength(2);
    expect(logContents).toMatch(/\{\s+"label": "parquet-viewer",\s+"level": "info",\s+"message": "opening .*small.parquet",\s+"time": "\S+"\s+\}/);
  });
});
