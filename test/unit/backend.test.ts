import toArray from '@async-generators/to-array';
import { describe, expect, jest, test } from '@jest/globals';
import os from 'os';
import * as path from 'path';
import { CancellationToken } from 'vscode';
import { BackendNames } from '../../src/backends/backend-name';
import { createParquetBackend } from '../../src/backends/parquet-backend-factory';
import { workspace } from './workspace';

jest.setTimeout(60000);


// parquet-tools doesn't work on Apple M1
const backends = BackendNames.filter(backend => os.type() != 'Darwin' || os.arch() == 'x64' || backend != 'parquet-tools');
describe.each(backends)("%s backend tests", (backendName) => {
  const backend = createParquetBackend(backendName);

  test("Error on not existing file", async function () {
    const error = (() => {
      switch (backendName) {
        case 'arrow':
          return "Failed to open no-such-file: Failed to open local file 'no-such-file'";
        case 'parquets':
          return /ENOENT: no such file or directory, stat '.*no-such-file'/;
        case 'parquet-tools':
          return /parquet-tools exited with code 1\n.*java.io.FileNotFoundException: File no-such-file does not exist/s;
        case 'parquet-wasm':
          return /ENOENT: no such file or directory, open '.*no-such-file'/;
      }
    })();
    await expect(toArray(backend.generateRows("no-such-file"))).rejects.toThrow(error);
  });

  test("cancellation", async function () {
    const token = {
      get isCancellationRequested() {
        return this.isCancellationRequestedMock();
      },
      isCancellationRequestedMock: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
      onCancellationRequested: jest.fn()
    };
    expect(await toArray(backend.generateRows(path.join(workspace, `small.parquet`), token as CancellationToken))).toHaveLength(1);
    expect(token.isCancellationRequestedMock).toBeCalledTimes(2);
  });
});
