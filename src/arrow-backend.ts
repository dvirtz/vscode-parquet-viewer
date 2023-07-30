import { AsyncRecordBatchStreamReader } from 'apache-arrow/Arrow';
import { PassThrough } from 'stream';
import { CancellationToken } from 'vscode';
import { ParquetBackend } from './parquet-backend';
import { jsonSpace } from './settings';
import { Stream } from 'stream';

function bigIntToJson(value: bigint) {
  // serialize as a number if it's in bounds, otherwise as a string
  if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
    return Number(value);
  }
  return value.toString();
}

export class ArrowBackend extends ParquetBackend {
  readParquet_: ((path: string, stream: Stream) => void) | undefined;

  private async readParquet(path: string, stream: Stream) {
    if (typeof (this.readParquet_) == 'undefined') {
      try {
        const module = await import("parquet-reader");
        this.readParquet_ = module.readParquet;
      } catch (_) {
        throw new Error('cannot find prebuilt arrow module, either build the module or use another backend');
      }
    }
    this.readParquet_(path, stream);
  }

  public async * toJsonImpl(parquetPath: string, _token?: CancellationToken): AsyncGenerator<string> {
    const stream = new PassThrough;
    await this.readParquet(parquetPath, stream);
    const batches = await AsyncRecordBatchStreamReader.from(stream);

    // read all records from the file and print them
    for await (const batch of batches) {
      for await (const row of batch) {
        yield JSON.stringify(row, (key, value) => {
          return typeof value === 'bigint'
            ? bigIntToJson(value)
            : value // return everything else unchanged
        }, jsonSpace());
      }
    }
  }
}
