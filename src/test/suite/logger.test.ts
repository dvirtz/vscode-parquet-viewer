import { settings } from "../../settings";
import * as tempy from 'tempy';
import { ParquetToolsRunner } from "../../parquet-tools-runner";
import { gen2array, getUri } from "./utils";
import { promises } from "fs";
import { expect } from "chai";
import path = require("path");

suite('logger tests', function () {
  this.timeout(20000);

  test('log file', async function () {
    const logFolder = tempy.directory();
    await settings().update('logFolder', logFolder);
    const parquet = await getUri('small.parquet');
    const contents = await gen2array(ParquetToolsRunner.toJson(parquet.fsPath));
    const logContents = await promises.readFile(path.join(logFolder, 'parquet-viewer.log'), 'utf-8');
    await settings().update('logFolder', undefined);
    expect(contents).to.have.lengthOf(2);
    expect(logContents).to.match(/\{\s+"label": "parquet-viewer",\s+"level": "info",\s+"message": "opening \S+\/small.parquet.as.json",\s+"time": "\S+"\s+\}/);
  });
});
