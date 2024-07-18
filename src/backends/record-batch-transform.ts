import { RecordBatch } from 'apache-arrow';
import { Transform, TransformCallback } from 'node:stream';

export function recordBatchTransform() {
  return new Transform({
    objectMode: true, transform: function (chunk: RecordBatch, _encoding: string, callback: TransformCallback) {
      for (const row of chunk) {
        this.push(row);
      }
      callback();
    }
  });
}
