import * as path from 'path';

const rootDir = path.join(__dirname, '..', '..');
export const root = path.join(rootDir, 'test', 'workspace');

function filePath(name: string, format: string) {
  return path.join(root, format, `${name}.${format}`);
}

export function parquet(name: string) {
  return filePath(name, 'parquet');
}

export function json(name: string) {
  return filePath(name, 'json');
}

export function csv(name: string) {
  return filePath(name, 'csv');
}
