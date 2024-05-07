import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { ParquetToolsBackend } from "../../src/backends/parquet-tools-backend";

void test("ParquetToolsBackend tests", async (context) => {
  await context.test("-h works", async () => {
    const stdout = (await ParquetToolsBackend.spawnParquetTools(['-h']).next()).value as string;
    assert.match(stdout, /parquet-tools cat:/);
  });
});
