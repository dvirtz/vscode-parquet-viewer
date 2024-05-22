import assert from 'node:assert';
import { createReadStream } from 'node:fs';
import os from 'node:os';
import { createInterface } from 'node:readline/promises';
import { test } from "node:test";

import { BackendNames } from "../../src/backends/backend-name";
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import { CsvFormatter } from "../../src/formatters/csv-formatter";

import * as workspace from './workspace';
import { zip } from './zip';
import { csvSeparatorMock } from './mocks/vscode';


const formatter = new CsvFormatter();


void test("CSV tests", async (context) => {
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
        await context.test(`Converts ${input} parquet to CSV`, async () => {
          for await (const [actual, expected] of zip(formatter.format(backend.generateRows(workspace.parquet(input))),
            createInterface({ input: createReadStream(workspace.csv(expectedFile)) }))) {
            assert.equal(actual, expected);
          }
        });
      }
    });

    const backend = createParquetBackend('arrow');

    for (const separator of ['\t', ';']) {
      await context.test(`CSV separator ${separator}`, async (context) => {
        context.after(() => {
          csvSeparatorMock.mock.restore();
        });

        csvSeparatorMock.mock.mockImplementation(() => separator);

        for await (const [actual, expected] of zip(formatter.format(backend.generateRows(workspace.parquet('small'))),
          createInterface({ input: createReadStream(workspace.csv('small')) }))) {
          assert.equal(actual, (expected as string).replaceAll(', ', separator));
        }
      });
    }
  }
});
