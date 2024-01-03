import { BackendName } from './backend-name';
import { getLogger } from '../logger';
import { ParquetToolsBackend } from './parquet-tools-backend';
import { ParquetsBackend } from './parquets-backend';
import { ParquetWasmBackend } from './parquet-wasm-backend';
import { ArrowCppBackend } from './arrow-cpp-backend';

export function createParquetBackend(backend: BackendName) {
  getLogger().info(`using ${backend} backend`);
  switch (backend) {
    case 'parquet-tools':
      return new ParquetToolsBackend;
    case 'parquets':
      return new ParquetsBackend;
    case 'arrow':
      return new ArrowCppBackend;
    case 'parquet-wasm':
      return new ParquetWasmBackend;
  }
}
