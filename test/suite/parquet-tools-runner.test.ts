
import { getUri, fileRead } from './utils';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { ParquetToolsRunner } from "../../src/parquet-tools-runner";
import toArray from '@async-generators/to-array';

use(chaiAsPromised);

suite("ParquetToolsRunner tests", () => {
  test('Converts Parquet to JSON', async function () {
    for (const name of ["small", "large"]) {
      const parquet = await getUri(`${name}.parquet`);
      const json = (await toArray(ParquetToolsRunner.toJson(parquet.fsPath))).join('');
      const expected = await fileRead(`${name}.json`);

      if (name === "small") {
        expect(json).to.equal(expected);
      } else if (json !== expected) {
        expect.fail("large JSON differ");
      }
    }
  });

  test("Error on not existing file", async function () {
    await expect(toArray(ParquetToolsRunner.toJson("no-such-file"))).be.rejectedWith(
      /parquet-tools exited with code 1:\n.*java.io.FileNotFoundException: File no-such-file does not exist/s
    );
  });

  test("-h works", async function () {
    const parquetTools = await ParquetToolsRunner.spawnParquetTools(['-h']);
    const exitCode = await new Promise( (resolve) => {
        parquetTools.on('close', resolve);
    });
    expect(exitCode).to.equal(0);
  });
});
