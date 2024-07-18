import { Readable } from 'node:stream';
import { CancellationToken } from 'vscode';
import { getLogger } from '../logger';
import { arrowCppBackend } from './arrow-cpp-backend';
import { BackendName } from './backend-name';
import { parquetToolsBackend } from './parquet-tools-backend';
import { parquetWasmBackend } from './parquet-wasm-backend';
import { parquetsBackend } from './parquets-backend';

export async function createParquetBackend(backend: BackendName, path: string, token?: CancellationToken): Promise<Readable> {
  const abortSignal = (() => {
    if (token) {
      const controller = new AbortController();

      token.onCancellationRequested(() => {
        getLogger().info(`parsing ${path} was cancelled by user`);
        controller.abort('user cancel');
      });

      return controller.signal;
    }
  })();

  getLogger().info(`opening ${path} using ${backend} backend`);
  switch (backend) {
    case 'parquet-tools':
      return parquetToolsBackend(path, abortSignal);
    case 'parquets':
      return parquetsBackend(path, abortSignal);
    case 'arrow':
      return arrowCppBackend(path, abortSignal);
    case 'parquet-wasm':
      return parquetWasmBackend(path, abortSignal);
  }
}
