import toArray from '@async-generators/to-array';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { createReadStream } from 'fs';
import os from 'os';
import { createInterface } from 'readline';
import { BackendNames } from '../../src/backends/backend-name';
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import * as workspace from './workspace';
import { JsonFormatter } from '../../src/formatters/json-formatter';
import { jsonAsArrayMock, jsonSpaceMock } from './mocks/vscode';
import { zip } from './zip';

const formatter = new JsonFormatter();


void test("JSON tests", async (context) => {
  for (const backendName of BackendNames.filter(backend => os.type() != 'Darwin' || os.arch() == 'x64' || backend != 'parquet-tools')) {
    await context.test(`${backendName} backend`, async (context) => {
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

      for (const [input, expectedFile] of testFiles[backendName]) {
        await context.test(`Converts ${input} parquet to JSON`, async () => {
          for await (const [actual, expected] of zip(formatter.format(backend.generateRows(workspace.parquet(input))),
            createInterface({ input: createReadStream(workspace.json(expectedFile)) }))) {
            assert.equal(actual, expected);
          }
        });
      }
    });
  }

  const backend = createParquetBackend('arrow');

  for (const space of [0, 2, 10, '\t', '###']) {
    await context.test(`JSON space ${space}`, async () => {
      jsonSpaceMock.mock.mockImplementation(() => space);

      for await (const [actual, expected] of zip(formatter.format(backend.generateRows(workspace.parquet('small'))),
        createInterface({ input: createReadStream(workspace.json('small')) }))) {
        assert.equal(actual, JSON.stringify(JSON.parse(expected), null, space));
      }

      jsonSpaceMock.mock.resetCalls();
      jsonSpaceMock.mock.restore();
    });
  }

  await context.test('jsonAsArray', async () => {
    jsonAsArrayMock.mock.mockImplementation(() => true);

    const json = await toArray(formatter.format(backend.generateRows(workspace.parquet('large'))));
    const records = await toArray(createInterface({ input: createReadStream(workspace.json('large.arrow')) }));
    assert.equal(json.join(''), JSON.stringify(records.map(str => JSON.parse(str))));

    jsonAsArrayMock.mock.resetCalls();
    jsonAsArrayMock.mock.restore();
  });
});
