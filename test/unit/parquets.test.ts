import toArray from '@async-generators/to-array';
import { describe, expect, test } from '@jest/globals';
import * as path from 'path';
import { ParquetsBackend } from "../../src/parquets-backend";
import { workspace } from './workspace';

describe("ParquetsBackend tests", () => {
  const backend = new ParquetsBackend();

  test("throws on invalid parquet version", async function () {
    await expect(toArray(backend.toJson(path.join(workspace, 'version_2.parquet')))).rejects.toThrow('invalid parquet version');
  });
});
