
import { ParquetContentProvider } from "../../parquet_content_provider";
import { getUri, fileRead } from './utils';
import { Uri } from 'vscode';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

suite("Provider tests", () => {
  const provider = new ParquetContentProvider();

  test('Converts Parquet to JSON', function() {
    this.timeout(20000);
    return Promise.all(["small", "large"].map(async name => {
      const json = await getUri(`${name}.parquet`).then(parquet => {
        return provider.provideTextDocumentContent(parquet);
      });
      const expected = await fileRead(`${name}.json`);

      if (name === "small") {
        expect(json).to.equal(expected);
      } else if (json !== expected) {
        expect.fail("large JSON differ");
      }
    }));
  });

  test("Error on not existing file", function () {
    expect(provider.provideTextDocumentContent(Uri.file("."))).to.be.rejectedWith(
      "error when running parquet-tools 1:\njava.io.FileNotFoundException: / (Is a directory)\n\n"
    );
  });

  test("-h works", function () {
    expect(ParquetContentProvider.spawnParquetTools(['-h'])).to.eventually.equal(0);
  });
});
