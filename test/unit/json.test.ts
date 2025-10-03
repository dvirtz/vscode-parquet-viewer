/* eslint-disable @typescript-eslint/no-floating-promises */
import { createReadStream } from 'fs';
import { strict as assert } from 'node:assert';
import { describe, test } from 'node:test';
import os from 'os';
import { createInterface } from 'readline';
import { BackendName, BackendNames } from '../../src/backends/backend-name';
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import { JsonFormatter } from '../../src/formatters/json-formatter';
import { workspace as workspaceMock } from './mocks/vscode';
import * as workspace from './workspace';
import { zip } from './zip';

describe("JSON tests", async () => {
  async function formattedParquet(backend: BackendName, filename: string) {
    return (await createParquetBackend(backend, workspace.parquet(filename))).compose(new JsonFormatter());
  }

  // parquet-tools doesn't work on MacOS due to Java version issues
  for (const backend of BackendNames.filter(backend => os.type() != 'Darwin' || backend != 'parquet-tools')) {
    test(`${backend} backend`, async (context) => {

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

      for (const [input, expectedFile] of testFiles[backend]) {
        await context.test(`Converts ${input} parquet to JSON`, async () => {
          for await (const [actual, expected] of zip(await formattedParquet(backend, input),
            createInterface({ input: createReadStream(workspace.json(expectedFile)) }))) {
            assert.equal(actual, expected);
          }
        });
      }
    });
  }

  for (const space of [0, 2, 10, '\t', '###']) {
    test(`JSON space ${space}`, async () => {
      workspaceMock.mocks.jsonSpace.mock.mockImplementation(() => space);

      for await (const [actual, expected] of zip(await formattedParquet('arrow', 'small'),
        createInterface({ input: createReadStream(workspace.json('small')) }))) {
        assert.equal(actual, JSON.stringify(JSON.parse(expected), null, space));
      }

      workspaceMock.mocks.jsonSpace.mock.resetCalls();
      workspaceMock.mocks.jsonSpace.mock.restore();
    });
  }

  test('jsonAsArray', async () => {
    workspaceMock.mocks.jsonAsArray.mock.mockImplementation(() => true);

    async function* asArray() {
      const json = JSON.parse((await (await formattedParquet('arrow', 'large')).toArray()).join(''));
      assert(json instanceof Array);
      yield* json;
    }

    for await (const [actual, expected] of zip(asArray(),
      createInterface({ input: createReadStream(workspace.json("large.arrow")) }))) {
      assert.equal(JSON.stringify(actual), expected);
    }

    workspaceMock.mocks.jsonAsArray.mock.resetCalls();
    workspaceMock.mocks.jsonAsArray.mock.restore();
  });
});
