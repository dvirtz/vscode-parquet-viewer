import { RecordBatch } from 'apache-arrow';
import { Readable, Transform, TransformCallback, addAbortSignal } from 'node:stream';

export async function recordBatchTransform(reader: Readable, signal?: AbortSignal) {
  const transform = new Transform({
    objectMode: true, transform: function (chunk: RecordBatch, _encoding: string, callback: TransformCallback) {
      for (const row of chunk) {
        this.push(row);
      }
      callback();
    }
  });
  const composed = reader.compose(transform);
  if (signal) {
    addAbortSignal(signal, composed);
  }
  return composed;
}
