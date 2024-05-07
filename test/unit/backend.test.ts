import toArray from '@async-generators/to-array';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import os from 'os';
import * as path from 'path';
import { BackendNames } from '../../src/backends/backend-name';
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import { workspace } from './workspace';

// parquet-tools doesn't work on Apple M1
for (const backendName of BackendNames.filter(backend => os.type() != 'Darwin' || os.arch() == 'x64' || backend != 'parquet-tools')) {
  void test(`${backendName} backend tests`, async (context) => {
    const backend = createParquetBackend(backendName);

    await context.test("Error on not existing file", async () => {
      const error = (() => {
        switch (backendName) {
          case 'arrow':
            return /Failed to open no-such-file: Failed to open local file 'no-such-file'/;
          case 'parquets':
            return /ENOENT: no such file or directory, stat '.*no-such-file'/;
          case 'parquet-tools':
            return /parquet-tools exited with code 1\n.*java.io.FileNotFoundException: File no-such-file does not exist/s;
          case 'parquet-wasm':
            return /ENOENT: no such file or directory, open '.*no-such-file'/;
        }
      })();
      await assert.rejects(toArray(backend.generateRows("no-such-file")), error);
    });

    await context.test("supports cancellation", async (context) => {
      const token = {
        get isCancellationRequested() {
          return this.isCancellationRequestedMock();
        },
        isCancellationRequestedMock: (() => {
          const fn = context.mock.fn(() => true);
          fn.mock.mockImplementationOnce(() => false);
          return fn;
        })(),
        onCancellationRequested: context.mock.fn(_ => ({dispose: () => undefined}))
      };
      assert.equal((await toArray(backend.generateRows(path.join(workspace, `small.parquet`), token))).length, 1);
      assert.equal(token.isCancellationRequestedMock.mock.callCount(), 2);
    });
  });
}
