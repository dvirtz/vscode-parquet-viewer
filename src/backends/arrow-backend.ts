import { RecordBatchReader } from 'apache-arrow/Arrow';
import { CancellationToken } from 'vscode';
import { ParquetBackend } from './parquet-backend';
import { jsonSpace } from '../settings';

function bigIntToJson(value: bigint) {
  // serialize as a number if it's in bounds, otherwise as a string
  if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
    return Number(value);
  }
  return value.toString();
}

export abstract class ArrowBackend extends ParquetBackend {
  abstract readParquet(path: string): Promise<RecordBatchReader>;

  public async * toJsonImpl(parquetPath: string, _token?: CancellationToken): AsyncGenerator<string> {
    const batches = await this.readParquet(parquetPath);

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
