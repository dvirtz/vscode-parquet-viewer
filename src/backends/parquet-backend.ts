import { CancellationToken } from 'vscode';
import { getLogger } from '../logger';

export abstract class ParquetBackend {
  public async* generateRows(parquetPath: string, token?: CancellationToken) {
    getLogger().info(`opening ${parquetPath}`)
    for await (const row of this.generateRowsImpl(parquetPath, token)) {
      if (token?.isCancellationRequested) {
        getLogger().info(`parsing ${parquetPath} was cancelled by user`);
        break;
      }
      yield row;
    }
  }

  abstract generateRowsImpl(parquetPath: string, token?: CancellationToken): AsyncGenerator<object>;
}
