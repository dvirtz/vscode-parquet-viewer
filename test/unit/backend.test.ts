import toArray from '@async-generators/to-array';
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { createReadStream } from 'fs';
import * as path from 'path';
import { createInterface } from 'readline';
import { CancellationToken } from 'vscode';
import { BackendNames } from '../../src/backend-name';
import { createParquetBackend } from '../../src/parquet-backend-factory';
import * as vscode from 'vscode';
import { workspace } from './workspace';

jest.setTimeout(60000);

describe.each(BackendNames)("%s backend tests", (backendName) => {
  const backend = createParquetBackend(backendName);

  const testFiles = {
    'parquet-tools': [
      ['small', 'small'],
      ['large', 'large'],
      ['version_2', 'version_2']
    ],
    'parquets': [
      ['small', 'small'],
      ['large', 'large'],
    ],
    'arrow': [
      ['small', 'small'],
      ['large', 'large.arrow'],
      ['version_2', 'version_2']
    ]
  };

  test.each(
    testFiles[backendName]
  )('Converts %s parquet to JSON', async function (input: string, expectedFile: string) {
    const actual = (await toArray(backend.toJson(path.join(workspace, `${input}.parquet`)))).map(line => line.trim());
    const expected = await toArray(createInterface({ input: createReadStream(path.join(workspace, `${expectedFile}.json`)) }));

    expect(actual).toEqual(expected);
  });

  test("Error on not existing file", async function () {
    const error = (() => {
      switch (backendName) {
        case 'arrow':
          return "Failed to open no-such-file: Failed to open local file 'no-such-file'";
        case 'parquets':
          return /ENOENT: no such file or directory, stat '.*no-such-file'/;
        case 'parquet-tools':
          return /parquet-tools exited with code 1\n.*java.io.FileNotFoundException: File no-such-file does not exist/s;
      }
    })();
    await expect(toArray(backend.toJson("no-such-file"))).rejects.toThrow(error);
  });

  test("cancellation", async function () {
    const token = {
      get isCancellationRequested() {
        return this.isCancellationRequestedMock();
      },
      isCancellationRequestedMock: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
      onCancellationRequested: jest.fn()
    };
    expect(await toArray(backend.toJson(path.join(workspace, `small.parquet`), token as CancellationToken))).toHaveLength(1);
    expect(token.isCancellationRequestedMock).toBeCalledTimes(2);
  });

  describe('mocked jsonSpace', () => {
    const workspaceConfig = vscode.workspace.getConfiguration();
    const parquetToolsPath = workspaceConfig.get('parquetToolsPath');
    let mockedSpaced: jest.Mocked<typeof workspaceConfig.get>;

    test.each([0, 2, 10, "\t", "###"])('Test space %s', async function (space: number | string) {
      mockedSpaced = jest.mocked(workspaceConfig.get).mockImplementation(name => {
        return {
          'jsonSpace': space,
          'parquetToolsPath': parquetToolsPath
        }[name];
      });

      const json = (await toArray(backend.toJson(path.join(workspace, `small.parquet`)))).map(line => line.trim());
      const records = await toArray(createInterface({ input: createReadStream(path.join(workspace, `small.json`)) }));
      const expected = records.map(record => JSON.stringify(JSON.parse(record), null, space));

      expect(json).toEqual(expected);
    });

    afterEach(() => {
      mockedSpaced.mockRestore();
    });
  });
});
