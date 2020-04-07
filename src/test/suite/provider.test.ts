
import * as assert from 'assert';

import { ParquetContentProvider } from "../../parquet_content_provider";
import { getUri, fileRead } from './utils';
import { Uri } from 'vscode';

suite("Provider tests", () => {
  const provider = new ParquetContentProvider();

  test('Converts Parquet to JSON', async () => {
    await Promise.all(["small", "large"].map(async name => {
      const json = await getUri(`${name}.parquet`).then(parquet => {
        return provider.provideTextDocumentContent(parquet);
      });
      const expected = await fileRead(`${name}.json`);

      if (name === "small") {
        assert.strictEqual(json, expected);
      } else if (json !== expected){
        assert.fail("large JSON differ");
      }
    }));
  });

  test("Error on not existing file", async () => {
    await provider.provideTextDocumentContent(Uri.file("."))
      .catch(error => {
        assert(error.indexOf('error when running parquet-tools') !== -1);
      });
  });

  test("-h works", async () => {
    await ParquetContentProvider.spawnParquetTools(['-h']).then(process =>
      process
        .on('error', err => assert.fail('got error ' + err))
        .on('close', code => {
          assert.equal(code, 0);
        }));
  });
});
