import * as vscode from 'vscode';
import { getLogger } from './logger';
import { ParquetReader } from '@dvirtz/parquets';
import * as os from 'os';
import { ParquetBackend } from './parquet-backend';

export class ParquetsBackend implements ParquetBackend {
  public async * toJson(parquetPath: string, token?: vscode.CancellationToken): AsyncGenerator<string> {
    const cancelledMessage = `parsing ${parquetPath} was cancelled by user`;
    if (token?.isCancellationRequested) {
      getLogger().info(cancelledMessage);
      return;
    }

    getLogger().info(`opening ${parquetPath}`)
    try {
      const reader = await ParquetReader.openFile(parquetPath);
      const cursor = reader.getCursor();

      // read all records from the file and print them
      let record = null;
      while (!token?.isCancellationRequested && (record = await cursor.next())) {
        yield `${JSON.stringify(record)}${os.EOL}`;
      }

      await reader.close();
    } catch (error) {
      const message = `while reading ${parquetPath}: ${error}`;
      getLogger().error(message);
      throw Error(message);
    }
  }
}
