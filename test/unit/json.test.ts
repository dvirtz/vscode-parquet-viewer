import toArray from '@async-generators/to-array';
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { createReadStream } from 'fs';
import os from 'os';
import * as path from 'path';
import { createInterface } from 'readline';
import * as vscode from 'vscode';
import { BackendNames } from '../../src/backends/backend-name';
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import { workspace } from './workspace';
import { JsonFormatter } from '../../src/json-formatter';

if (!process.env.DEBUG_MODE)
  jest.setTimeout(60000);

// https://stackoverflow.com/a/48293566
async function* zip<T extends AsyncIterable<unknown>[]>(...iterables: T) {
  const iterators = iterables.map(i => i[Symbol.asyncIterator]())
  while (true) {
    const results = await Promise.all(iterators.map(async iter => await iter.next()));
    if (results.some(res => res.done)) break;
    yield results.map(res => res.value);
  }
}

const formatter = new JsonFormatter();


// parquet-tools doesn't work on Apple M1
describe("JSON tests", () => {
  const backends = BackendNames.filter(backend => os.type() != 'Darwin' || os.arch() == 'x64' || backend != 'parquet-tools');
  describe.each(backends)("%s backend", (backendName) => {
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
        ['version_2', 'version_2'],
        ['zstd', 'small'],
        ['gzip', 'small'],
        ['brotli', 'small'],
        ['lz4', 'small'],
        ['polars', 'polars'],
      ],
      'parquet-wasm': [
        ['small', 'small'],
        ['large', 'large.arrow'],
        ['version_2', 'version_2'],
        ['zstd', 'small'],
        ['gzip', 'small'],
        ['brotli', 'small'],
        ['polars', 'polars'],
      ]
    };

    test.each(
      testFiles[backendName]
    )('Converts %s parquet to JSON', async function (input: string, expectedFile: string) {
      for await (const [actual, expected] of zip(formatter.format(backend.generateRows(path.join(workspace, `${input}.parquet`))),
        createInterface({ input: createReadStream(path.join(workspace, `${expectedFile}.json`)) }))) {
        expect(actual).toEqual(expected);
      }
    });
  });

  describe('mocked', () => {
    const workspaceConfig = vscode.workspace.getConfiguration();
    const parquetToolsPath = workspaceConfig.get('parquetToolsPath');
    const backend = createParquetBackend('arrow');

    describe('jsonSpace', () => {
      let mockedSpaced: jest.Mocked<typeof workspaceConfig.get>;

      test.each([0, 2, 10, "\t", "###"])('Test space %s', async function (space: number | string) {
        mockedSpaced = jest.mocked(workspaceConfig.get).mockImplementation(name => {
          return {
            'json.space': space,
            'parquetToolsPath': parquetToolsPath
          }[name];
        });

        for await (const [actual, expected] of zip(formatter.format(backend.generateRows(path.join(workspace, `small.parquet`))),
          createInterface({ input: createReadStream(path.join(workspace, `small.json`)) }))) {
          expect(actual).toEqual(JSON.stringify(JSON.parse(expected), null, space));
        }
      });

      afterEach(() => {
        mockedSpaced.mockRestore();
      });
    });

    describe('jsonAsArray', () => {
      let mockedAsArray: jest.Mocked<typeof workspaceConfig.get>;

      test('As array', async function () {
        mockedAsArray = jest.mocked(workspaceConfig.get).mockImplementation(name => {
          return {
            'json.asArray': true,
            'parquetToolsPath': parquetToolsPath
          }[name];
        });

        const json = await toArray(formatter.format(backend.generateRows(path.join(workspace, `large.parquet`))));
        const records = await toArray(createInterface({ input: createReadStream(path.join(workspace, `large.arrow.json`)) }));
        expect(json.join('')).toEqual(JSON.stringify(records.map(str => JSON.parse(str))));
      });

      afterEach(() => {
        mockedAsArray.mockRestore();
      });
    });
  });
});
