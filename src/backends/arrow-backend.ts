import { RecordBatchReader } from 'apache-arrow/Arrow';
import { CancellationToken } from 'vscode';
import { ParquetBackend } from './parquet-backend';

export abstract class ArrowBackend extends ParquetBackend {
  abstract readParquet(path: string): Promise<RecordBatchReader>;

  public async * toJsonImpl(parquetPath: string, _token?: CancellationToken): AsyncGenerator<object> {
    const batches = await this.readParquet(parquetPath);

    // read all records from the file and print them
    for await (const batch of batches) {
      for await (const row of batch) {
        yield row;
      }
    }
  }
}
