import * as assert from 'assert';
import { Uri, workspace } from "vscode";
import { promises } from 'fs';

export async function getUri(fileName: string): Promise<Uri> {
  const testFiles = await workspace.findFiles(`**/${fileName}`);
  assert.strictEqual(testFiles.length, 1);
  return testFiles[0];
}

export async function fileRead(fileName: string): Promise<string> {
  const uri = await getUri(fileName);
  return await promises.readFile(uri.fsPath, 'utf8');
}
