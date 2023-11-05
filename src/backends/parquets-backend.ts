import { CancellationToken } from 'vscode';
import { ParquetReader } from '@dvirtz/parquets';
import { ParquetBackend } from './parquet-backend';

export class ParquetsBackend extends ParquetBackend {
  public async * toJsonImpl(parquetPath: string, _token?: CancellationToken): AsyncGenerator<object> {
    const reader = await ParquetReader.openFile(parquetPath);
    const cursor = reader.getCursor();

    // read all records from the file and print them
    let record = null;
    while ((record = await cursor.next())) {
      yield record;
    }

    await reader.close();
  }
}
