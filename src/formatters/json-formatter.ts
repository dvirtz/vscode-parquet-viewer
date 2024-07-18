import { Transform, TransformCallback } from 'node:stream';
import { jsonAsArray, jsonSpace } from '../settings';

export class JsonFormatter extends Transform {
  private asArray = jsonAsArray();
  private last: string | undefined;

  constructor() {
    super({
      objectMode: true
    });
    if (this.asArray) {
      this.push('[');
    }
  }

  _transform(chunk: object, _encoding: BufferEncoding, callback: TransformCallback): void {
    if (this.last) {
      this.push(`${this.last}${this.asArray ? ',' : ''}`);
    }
    this.last = JSON.stringify(chunk, (key, value) => {
      return typeof value === 'bigint'
        ? this.bigIntToJson(value)
        : value; // return everything else unchanged
    }, jsonSpace());
    callback();
  }

  _flush(callback: TransformCallback): void {
    if (this.last) {
      this.push(this.last);
    }
    if (this.asArray) {
      this.push(']');
    }
    callback();
  }

  private bigIntToJson(value: bigint) {
    // serialize as a number if it's in bounds, otherwise as a string
    if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
      return Number(value);
    }
    return value.toString();
  }

}
