import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { parquetsBackend } from "../../src/backends/parquets-backend";
import * as workspace from './workspace';

void test("ParquetsBackend tests", async (context) => {
  await context.test("throws on invalid parquet version", async () => {
    await assert.rejects((await parquetsBackend(workspace.parquet('version_2'))).toArray(), /invalid parquet version/);
  });
});
