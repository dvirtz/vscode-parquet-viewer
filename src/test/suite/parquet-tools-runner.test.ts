
import { getUri, fileRead } from './utils';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { ParquetToolsRunner } from "../../parquet-tools-runner";

async function gen2array<T>(gen: AsyncGenerator<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const x of gen) {
    out.push(x);
  }
  return out;
}

use(chaiAsPromised);

suite("ParquetToolsRunner tests", () => {
  test('Converts Parquet to JSON', async function () {
    this.timeout(20000);
    for (const name of ["small", "large"]) {
      const parquet = await getUri(`${name}.parquet`);
      const json = (await gen2array(ParquetToolsRunner.toJson(parquet.fsPath))).join('');
      const expected = await fileRead(`${name}.json`);

      if (name === "small") {
        expect(json).to.equal(expected);
      } else if (json !== expected) {
        expect.fail("large JSON differ");
      }
    }
  });

  test("Error on not existing file", async function () {
    expect(gen2array(ParquetToolsRunner.toJson("no-such-file"))).be.rejectedWith(
      "error when running parquet-tools 1:\njava.io.FileNotFoundException: / (Is a directory)\n\n"
    );
  });

  test("-h works", function () {
    expect(ParquetToolsRunner.spawnParquetTools(['-h'])).to.eventually.equal(0);
  });
});
