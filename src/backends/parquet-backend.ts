import { CancellationToken } from 'vscode';
import { getLogger } from '../logger';

export abstract class ParquetBackend {
  public async* toJson(parquetPath: string, token?: CancellationToken) {
    getLogger().info(`opening ${parquetPath}`)
    for await (const line of this.toJsonImpl(parquetPath, token)) {
      if (token?.isCancellationRequested) {
        getLogger().info(`parsing ${parquetPath} was cancelled by user`);
        break;
      }
      yield line;
    }
  }

  abstract toJsonImpl(parquetPath: string, token?: CancellationToken): AsyncGenerator<string>;
}
