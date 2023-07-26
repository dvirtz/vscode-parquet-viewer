import { AsyncRecordBatchStreamReader } from 'apache-arrow/Arrow';
import { PassThrough } from 'stream';
import { CancellationToken } from 'vscode';
import { ParquetBackend } from './parquet-backend';
import { jsonSpace } from './settings';
import { readParquet } from 'parquet-reader';

function bigIntToJson(value: bigint) {
  // serialize as a number if it's in bounds, otherwise as a string
  if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
    return Number(value);
  }
  return value.toString();
}

export class ArrowBackend extends ParquetBackend {
  public async * toJsonImpl(parquetPath: string, _token?: CancellationToken): AsyncGenerator<string> {
    const stream = new PassThrough;
    readParquet(parquetPath, stream);
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
