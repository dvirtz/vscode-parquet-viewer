import {describe, expect, test} from '@jest/globals';
import { commands, extensions } from 'vscode';
import { getUri, extensionId } from './utils';

describe("Parquet extension tests", function () {
  test("Should find extension", function () {
    const extension = extensions.getExtension(extensionId);
    expect(extension).toBeDefined();
    expect(extension?.id).toBe(extensionId);
  });

  test("Activation point", async function () {
    await commands.executeCommand('vscode.open', await getUri('small.parquet'));
    const extension = extensions.getExtension(extensionId);
    expect(extension).toBeDefined();
    expect(extension?.isActive).toBe(true);
  });
});
