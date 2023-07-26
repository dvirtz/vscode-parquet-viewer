import { CancellationToken } from 'vscode';
import { ParquetReader } from '@dvirtz/parquets';
import { ParquetBackend } from './parquet-backend';
import { jsonSpace } from './settings';

export class ParquetsBackend extends ParquetBackend {
  public async * toJsonImpl(parquetPath: string, _token?: CancellationToken): AsyncGenerator<string> {
    const reader = await ParquetReader.openFile(parquetPath);
    const cursor = reader.getCursor();

    // read all records from the file and print them
    let record = null;
    while ((record = await cursor.next())) {
      yield JSON.stringify(record, null, jsonSpace());
    }

    await reader.close();
  }
}
