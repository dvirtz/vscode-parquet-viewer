import * as assert from 'assert';
import { Uri, workspace } from "vscode";
import { promises } from 'fs';

export async function getUri(fileName: String): Promise<Uri> {
  const testFiles = await workspace.findFiles(`**/${fileName}`);
  assert.strictEqual(testFiles.length, 1);
  return testFiles[0];
}

export async function fileRead(fileName: string): Promise<string> {
  const uri = await getUri(fileName);
  return await promises.readFile(uri.fsPath, 'utf8');
}

export async function gen2array<T>(gen: AsyncGenerator<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const x of gen) {
    out.push(x);
  }
  return out;
}
