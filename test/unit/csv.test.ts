/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from 'node:assert';
import { createReadStream } from 'node:fs';
import os from 'node:os';
import { createInterface } from 'node:readline/promises';
import { describe, test } from "node:test";

import { BackendName, BackendNames } from "../../src/backends/backend-name";
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import { CsvFormatter } from "../../src/formatters/csv-formatter";

import { workspace as workspaceMock } from './mocks/vscode';
import * as workspace from './workspace';
import { zip } from './zip';

describe("CSV tests", () => {
  async function formattedParquet(backend: BackendName, filename: string) {
    return (await createParquetBackend(backend, workspace.parquet(filename))).compose(new CsvFormatter());
  }

  for (const backend of BackendNames.filter(backend => os.type() != 'Darwin' || os.arch() == 'x64' || backend != 'parquet-tools')) {
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
        await context.test(`Converts ${input} parquet to CSV`, async () => {
          for await (const [actual, expected] of zip(await formattedParquet(backend, input),
            createInterface({ input: createReadStream(workspace.csv(expectedFile)) }))) {
            assert.equal(actual, expected);
          }
        });
      }
    });

    for (const separator of ['\t', ';']) {
      test(`CSV separator ${separator}`, async (context) => {
        context.after(() => {
          workspaceMock.mocks.csvSeparator.mock.restore();
        });

        workspaceMock.mocks.csvSeparator.mock.mockImplementation(() => separator);

        for await (const [actual, expected] of zip(await formattedParquet('arrow', 'small'),
          createInterface({ input: createReadStream(workspace.csv('small')) }))) {
          assert.equal(actual, (expected as string).replaceAll(', ', separator));
        }
      });
    }
  }
});
