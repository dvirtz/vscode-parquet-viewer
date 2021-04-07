
import { getUri, fileRead } from './utils';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import toArray from '@async-generators/to-array';
import { ParquetsBackend } from '../../src/parquets-backend';

use(chaiAsPromised);

suite("ParquetsBackend tests", () => {
  test('Converts Parquet to JSON', async function () {
    for (const name of ["small", "large"]) {
      const parquet = await getUri(`${name}.parquet`);
      const json = (await toArray(ParquetsBackend.toJson(parquet.fsPath))).join('');
      const expected = await fileRead(`${name}.json`);

      if (name === "small") {
        expect(json).to.equal(expected);
      } else if (json !== expected) {
        expect.fail("large JSON differ");
      }
    }
  });

  test("Error on not existing file", async function () {
    await expect(toArray(ParquetsBackend.toJson("no-such-file"))).be.rejectedWith(
      /error while reading no-such-file: Error: ENOENT: no such file or directory, stat '.*no-such-file'/
    );
  });
});
