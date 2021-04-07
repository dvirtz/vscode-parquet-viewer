
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { ParquetToolsBackend } from "../../src/parquet-tools-backend";
import { fileRead, getUri } from './utils';
import toArray from '@async-generators/to-array';

use(chaiAsPromised);

suite("ParquetToolsBackend tests", () => {
  test('Converts Parquet to JSON', async function () {
    for (const name of ["small", "large"]) {
      const parquet = await getUri(`${name}.parquet`);
      const json = (await toArray(ParquetToolsBackend.toJson(parquet.fsPath))).join('');
      const expected = await fileRead(`${name}.json`);

      if (name === "small") {
        expect(json).to.equal(expected);
      } else if (json !== expected) {
        expect.fail("large JSON differ");
      }
    }
  });

  test("Error on not existing file", async function () {
    await expect(toArray(ParquetToolsBackend.toJson("no-such-file"))).be.rejectedWith(
      /parquet-tools exited with code 1:\n.*java.io.FileNotFoundException: File no-such-file does not exist/s
    );
  });

  test("-h works", async function () {
    const parquetTools = await ParquetToolsBackend.spawnParquetTools(['-h']);
    const exitCode = await new Promise((resolve) => {
      parquetTools.on('close', resolve);
    });
    expect(exitCode).to.equal(0);
  });
});
