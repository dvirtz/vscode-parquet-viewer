import { expect } from 'chai';
import {extensions, workspace} from 'vscode';

// Defines a Mocha test suite to group tests of similar kind together
suite("Parquet extension tests", function () {

  test("Should find extension", function () {
    const extension = extensions.getExtension("dvirtz.parquet-viewer");
    expect(extension).to.be.ok;
  });

  test("Settings", function () {
    const parquetTools = workspace.getConfiguration('parquet-viewer').get<string>('parquetToolsPath');
    expect(parquetTools).to.equal("parquet-tools-1.12.0-SNAPSHOT.jar");
  });
});
