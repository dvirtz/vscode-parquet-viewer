import { ParquetReader } from '@dvirtz/parquets';
import { Readable } from 'node:stream';

async function* parquetsGenerator(path: string) {
  const reader = await ParquetReader.openFile(path);
  const cursor = reader.getCursor();
  yield* cursor;

  await reader.close();
}

export async function parquetsBackend(path: string, signal?: AbortSignal): Promise<Readable> {
  return Readable.from(parquetsGenerator(path), { objectMode: true, signal: signal });
}
