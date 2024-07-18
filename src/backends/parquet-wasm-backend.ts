import { AsyncRecordBatchStreamReader } from 'apache-arrow';
import { readFile } from "node:fs/promises";
import { Readable } from 'node:stream';
import { readParquet } from "parquet-wasm/node/arrow1";
import { recordBatchTransform } from './record-batch-transform';

export async function parquetWasmBackend(path: string, signal?: AbortSignal): Promise<Readable> {
  const data = new Uint8Array(await readFile(path));
  const stream = readParquet(data);
  return recordBatchTransform(AsyncRecordBatchStreamReader.from(stream.intoIPCStream()).toNodeStream(), signal);
}
