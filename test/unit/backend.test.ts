/* eslint-disable @typescript-eslint/no-floating-promises */
import { strict as assert } from 'node:assert';
import { describe, mock, test } from 'node:test';
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

for (const backend of BackendNames) {
  describe(`${backend} backend tests`, async () => {
    test("error on none existing file", async () => {
      const expected = (() => {
        switch (backend) {
          case 'arrow':
            return /Failed to open no-such-file: Failed to open local file 'no-such-file'/;
          case 'parquets':
            return /ENOENT: no such file or directory, stat '.*no-such-file'/;
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
      await assert.rejects(rows.next(), /AbortError: The operation was aborted/);
    });
  });
}
