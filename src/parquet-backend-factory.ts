import { ArrowBackend } from './arrow-backend';
import { BackendName } from './backend-name';
import { getLogger } from './logger';
import { ParquetToolsBackend } from './parquet-tools-backend';
import { ParquetsBackend } from './parquets-backend';

export function createParquetBackend(backend: BackendName) {
  getLogger().info(`using ${backend} backend`);
  switch (backend) {
    case 'parquet-tools':
      return new ParquetToolsBackend;
    case 'parquets':
      return new ParquetsBackend;
    default:
      return new ArrowBackend;
  }
}
