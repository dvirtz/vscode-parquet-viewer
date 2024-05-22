import toArray from '@async-generators/to-array';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { ParquetsBackend } from "../../src/backends/parquets-backend";
import * as workspace from './workspace';

void test("ParquetsBackend tests", async (context) => {
  const backend = new ParquetsBackend();

  await context.test("throws on invalid parquet version", async () => {
    await assert.rejects(toArray(backend.generateRows(workspace.parquet('version_2'))), /invalid parquet version/);
  });
});
