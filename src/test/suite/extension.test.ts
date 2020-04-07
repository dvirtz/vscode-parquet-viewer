//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import {extensions, workspace} from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Parquet extension tests", function () {

  test("Should find extension", () => {
    const extension = extensions.getExtension("dvirtz.parquet-viewer");
    assert(extension);
  });

  test("Settings", () => {
    var parquetTools = workspace.getConfiguration('parquet-viewer').get<string>('parquetToolsPath');
    assert.equal(parquetTools, "parquet-tools-1.12.0-SNAPSHOT.jar");
  });
});
