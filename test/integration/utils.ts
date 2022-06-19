import * as assert from 'assert';
import { Uri, workspace } from 'vscode';
import * as meta from '../../package.json';

export async function getUri(fileName: string): Promise<Uri> {
  const testFiles = await workspace.findFiles(`**/${fileName}`);
  assert.strictEqual(testFiles.length, 1);
  return testFiles[0];
}

export const extensionId = `${meta.publisher}.${meta.name}`;

export async function readFile(fileName: string): Promise<string> {
  const uri = await getUri(fileName);
  const contents = await workspace.fs.readFile(uri);
  return (new TextDecoder()).decode(contents);
}

export const deferred = <T>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
};
