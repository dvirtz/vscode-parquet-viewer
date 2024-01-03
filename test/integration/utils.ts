import { expect } from '@jest/globals';
import { Uri, workspace } from 'vscode';
import * as meta from '../../package.json';

export async function getUri(fileName: string): Promise<Uri> {
  const testFiles = await workspace.findFiles(`**/${fileName}`);
  expect(testFiles.length).toBe(1);
  return testFiles[0];
}

export const extensionId = `${meta.publisher}.${meta.name}`;

export async function readFile(fileName: string): Promise<string> {
  const uri = await getUri(fileName);
  const contents = await workspace.fs.readFile(uri);
  return (new TextDecoder()).decode(contents);
}
