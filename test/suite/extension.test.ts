import { expect } from 'chai';
import * as assert from 'assert';
import { commands, extensions } from 'vscode';
import { getUri } from './utils';

suite("Parquet extension tests", function () {
  test("Should find extension", function () {
    const extension = extensions.getExtension("dvirtz.parquet-viewer");
    assert(extension);
    expect(extension.id).to.be.equal("dvirtz.parquet-viewer");
    expect(extension.isActive).to.be.equal(false);
  });

  test("Activation point", async function () {
    await commands.executeCommand('vscode.open', await getUri('small.parquet'));
    const extension = extensions.getExtension("dvirtz.parquet-viewer");
    assert(extension);
    expect(extension.isActive).to.be.equal(true);
  });
});
