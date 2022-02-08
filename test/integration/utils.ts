import * as assert from 'assert';
import { Uri, workspace } from 'vscode';
import * as meta from '../../package.json';

export async function getUri(fileName: string): Promise<Uri> {
  const testFiles = await workspace.findFiles(`**/${fileName}`);
  assert.strictEqual(testFiles.length, 1);
  return testFiles[0];
}

export const extensionId = `${meta.publisher}.${meta.name}`;
