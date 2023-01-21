import { AsyncRecordBatchStreamReader } from 'apache-arrow/Arrow';
import * as path from 'path';
import bindings from 'pkg-prebuilds';
import { PassThrough } from 'stream';
import { CancellationToken } from 'vscode';
import bindingOptions from './binding-options';
import { getLogger } from './logger';
import { ParquetBackend } from './parquet-backend';
import { jsonSpace } from './settings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { readParquet } = bindings(path.join(__dirname, 'arrow-parquet-reader'), bindingOptions);

function bigIntToJson(value: bigint) {
  // serialize as a number if it's in bounds, otherwise as a string
  if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
    return Number(value);
  }
  return value.toString();
}

export class ArrowBackend implements ParquetBackend {
  public async * toJson(parquetPath: string, token?: CancellationToken | undefined): AsyncGenerator<string> {
    getLogger().info(`opening ${parquetPath}`)
    try {
      const stream = new PassThrough;
      readParquet(parquetPath, stream);
      const batches = await AsyncRecordBatchStreamReader.from(stream);

      // read all records from the file and print them
      for await (const batch of batches) {
        for await (const row of batch) {
          if (token?.isCancellationRequested) {
            break;
          }
          yield JSON.stringify(row, (key, value) => {
            return typeof value === 'bigint'
              ? bigIntToJson(value)
              : value // return everything else unchanged
          }, jsonSpace());
        }
      }
    } catch (error) {
      const message = `while reading ${parquetPath}: ${error}`;
      getLogger().error(message);
      throw Error(message);
    }

    if (token?.isCancellationRequested) {
      getLogger().info(`parsing ${parquetPath} was cancelled by user`);
    }
  }

}
