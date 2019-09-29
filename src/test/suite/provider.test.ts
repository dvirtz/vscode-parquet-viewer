
import * as assert from 'assert';

import { ParquetContentProvider } from "../../parquet_content_provider";
import { getUri, fileRead } from './utils';
import { Uri } from 'vscode';

suite("Provider tests", () => {
  const provider = new ParquetContentProvider();

  test('Converts Parquet to JSON', done => {
    ["small", "large"].forEach(async name => {
      const json = await getUri(`${name}.parquet`).then(parquet => {
        return provider.provideTextDocumentContent(parquet);
      });
      const expected = await fileRead(`${name}.json`);

      assert.strictEqual(json, expected);
      done();
    });
  });

  test("Error on not existing file", done => {
    provider.provideTextDocumentContent(Uri.file("."))
      .catch(error => {
        assert(error.indexOf('error when running parquet-tools') !== -1);
        done();
      });
  });

  test("-h works", done => {
    ParquetContentProvider.spawnParquetTools(['-h']).then(process =>
      process
        .on('error', err => assert.fail('got error ' + err))
        .on('close', code => {
          assert.equal(code, 0);
          done();
        }));
  });
});