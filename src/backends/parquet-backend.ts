import { CancellationToken } from 'vscode';
import { getLogger } from '../logger';
import { jsonSpace } from '../settings';

export abstract class ParquetBackend {
  public async* toJson(parquetPath: string, token?: CancellationToken) {

    function bigIntToJson(value: bigint) {
      // serialize as a number if it's in bounds, otherwise as a string
      if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
        return Number(value);
      }
      return value.toString();
    }

    getLogger().info(`opening ${parquetPath}`)
    for await (const line of this.toJsonImpl(parquetPath, token)) {
      if (token?.isCancellationRequested) {
        getLogger().info(`parsing ${parquetPath} was cancelled by user`);
        break;
      }
      yield JSON.stringify(line, (key, value) => {
        return typeof value === 'bigint'
          ? bigIntToJson(value)
          : value // return everything else unchanged
      }, jsonSpace());
    }
  }

  abstract toJsonImpl(parquetPath: string, token?: CancellationToken): AsyncGenerator<object>;
}
