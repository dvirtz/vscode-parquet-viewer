import { Transform } from 'node:stream';
import { TransformCallback } from 'stream';
import { csvSeparator } from '../settings';

export class CsvFormatter extends Transform {
  private first = true;
  private separator = csvSeparator();

  constructor() {
    super({
      objectMode: true
    });
  }

  _transform(chunk: object, _encoding: BufferEncoding, callback: TransformCallback): void {
    if (this.first) {
      this.first = false;
      this.push(this.generateHeader(chunk));
    }
    this.push(this.generateRow(chunk));
    callback();
  }

  private generateHeader(line: object) {
    return Object.keys(line).join(this.separator);
  }

  private generateRow(line: object) {
    return Object.values(line).join(this.separator);
  }
}
