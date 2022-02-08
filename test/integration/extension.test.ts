import * as assert from 'assert';
import { commands, extensions } from 'vscode';
import { getUri, extensionId } from './utils';

describe("Parquet extension tests", function () {
  test("Should find extension", function () {
    const extension = extensions.getExtension(extensionId);
    assert(extension);
    expect(extension.id).toBe(extensionId);
  });

  test("Activation point", async function () {
    await commands.executeCommand('vscode.open', await getUri('small.parquet'));
    const extension = extensions.getExtension(extensionId);
    assert(extension);
    expect(extension.isActive).toBe(true);
  });
});
