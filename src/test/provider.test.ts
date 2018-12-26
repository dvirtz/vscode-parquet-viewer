
import * as assert from 'assert';

import { ParquetContentProvider } from "../parquet_content_provider";
import { getUri, fileRead } from './utils';
import { Uri } from 'vscode';

suite("Provider tests", () => {

  test("Parquet to JSON", async () => {
    const provider = new ParquetContentProvider();
    const json = getUri("small.parquet").then(parquet => {
      return provider.provideTextDocumentContent(parquet);
    });
    const expected = fileRead("small.json");

    return Promise.all([json, expected]).then(values => {
      assert.strictEqual(values[0], values[1]);
    });
  });

  test("Error on not existing file", async () => {
    const provider = new ParquetContentProvider();

    return provider.provideTextDocumentContent(Uri.parse("file://.")).then(data => {
        assert(false, "should not get here");
      }, (error: string) => {
        assert(error.indexOf('error when running parquet-tools') !== -1);
      });
  });
});