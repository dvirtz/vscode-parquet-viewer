import { Readable } from 'node:stream';
import { CancellationToken } from 'vscode';
import { getLogger } from '../logger';
import { arrowCppBackend } from './arrow-cpp-backend';
import { BackendName } from './backend-name';
import { parquetToolsBackend } from './parquet-tools-backend';
import { parquetWasmBackend } from './parquet-wasm-backend';
import { parquetsBackend } from './parquets-backend';

export async function createParquetBackend(backend: BackendName, path: string, token?: CancellationToken): Promise<Readable> {
  getLogger().info(`opening ${path} using ${backend} backend`);
  const reader = await (async () => {
    switch (backend) {
      case 'parquet-tools':
        return await parquetToolsBackend(path, token);
      case 'parquets':
        return await parquetsBackend(path);
      case 'arrow':
        return await arrowCppBackend(path);
      case 'parquet-wasm':
        return await parquetWasmBackend(path);
    }
  })();

  token?.onCancellationRequested(() => {
    getLogger().info(`parsing ${path} was cancelled by user`);
    reader.destroy();
  });

  return reader;
}

export async function* generateParquetRows(backend: BackendName, path: string, token?: CancellationToken) {
  yield* await createParquetBackend(backend, path, token);
}
