import { describe, expect, test, jest } from '@jest/globals';
import { ParquetToolsBackend } from "../../src/backends/parquet-tools-backend";

jest.retryTimes(3);

describe("ParquetToolsBackend tests", () => {
  test("-h works", async function () {
    const stdout = (await ParquetToolsBackend.spawnParquetTools(['-h']).next()).value;
    expect(stdout).toContain('parquet-tools cat:');
  });
});
