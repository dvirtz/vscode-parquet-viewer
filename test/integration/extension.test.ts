import { test } from 'node:test';
import { commands, extensions } from 'vscode';
import { getUri, extensionId } from './utils';
import { strict as assert } from 'node:assert';

export async function runTest() {
  await test("Parquet extension tests", async (context) => {
    await context.test("Should find extension", () => {
      const extension = extensions.getExtension(extensionId);
      assert.ok(extension, `Extension ${extensionId} not found`);
      assert.equal(extension?.id, extensionId);
    });

    await context.test("Activation point", async () => {
      await commands.executeCommand('vscode.open', await getUri('small.parquet'));
      const extension = extensions.getExtension(extensionId);
      assert.ok(extension, `Extension ${extensionId} not found`);
      assert.ok(extension?.isActive);
    });
  });
}
