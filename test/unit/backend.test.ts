/* eslint-disable @typescript-eslint/no-floating-promises */
import { strict as assert } from 'node:assert';
import { describe, mock, test } from 'node:test';
import os from 'os';
import { CancellationToken } from 'vscode';
import { BackendNames } from '../../src/backends/backend-name';
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import * as workspace from './workspace';

class CancellationTokenMock implements CancellationToken {
  isCancellationRequested = false;
  callback?: () => undefined;
  onCancellationRequested = mock.fn((callback: (_?: unknown) => undefined) => {
    if (this.callback) {
      const existingCallback = this.callback;
      this.callback = () => {
        existingCallback();
        return callback();
      };
    } else {
      this.callback = callback;
    }
    return { dispose: () => undefined };
  });
  cancel = () => {
    this.isCancellationRequested = true;
    if (this.callback) this.callback();
  }
}

// parquet-tools doesn't work on Apple M1
for (const backend of BackendNames.filter(backend => os.type() != 'Darwin' || os.arch() == 'x64' || backend != 'parquet-tools')) {
  describe(`${backend} backend tests`, async () => {
    test("error on none existing file", async () => {
      const expected = (() => {
        switch (backend) {
          case 'arrow':
            return /Failed to open no-such-file: Failed to open local file 'no-such-file'/;
          case 'parquets':
            return /ENOENT: no such file or directory, stat '.*no-such-file'/;
          case 'parquet-tools':
            return /parquet-tools exited with code 1\n.*java.io.FileNotFoundException: File no-such-file does not exist/;
          case 'parquet-wasm':
            return /ENOENT: no such file or directory, open '.*no-such-file'/;
        }
      })();
      await assert.rejects(async () => (await createParquetBackend(backend, "no-such-file")).toArray(), expected);
    });

    test("supports cancellation", async () => {
      const token = new CancellationTokenMock();
      const rows = (await createParquetBackend(backend, workspace.parquet('small'), token)).iterator();
      const first = await rows.next();
      assert.ok(first.done === false);
      assert.notEqual(first.value, "");
      assert.ok(token.onCancellationRequested.mock.callCount() >= 1);
      token.cancel();
      if (backend !== 'parquet-tools') {
        // parquet-tools might already be done by the time we cancel
        await assert.rejects(rows.next(), /AbortError: The operation was aborted/);
      }
    });
  });
}
