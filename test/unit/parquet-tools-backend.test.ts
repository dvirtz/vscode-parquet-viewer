import { describe, expect, test } from '@jest/globals';
import { ParquetToolsBackend } from "../../src/parquet-tools-backend";

describe("ParquetToolsBackend tests", () => {
  test("-h works", async function () {
    const stdout = (await ParquetToolsBackend.spawnParquetTools(['-h']).next()).value;
    expect(stdout).toContain('parquet-tools cat:');
  });
});
