
import { jest } from '@jest/globals';
import * as path from 'path';

const testDir = path.join(__dirname, '..', '..');

module.exports = {
  workspace: {
    getConfiguration: jest.fn().mockReturnValue({
      get: jest.fn(name => {
        switch (name) {
          case 'parquetToolsPath':
            return path.join(testDir, 'workspace', 'parquet-tools-1.12.0-SNAPSHOT.jar');
          default:
            return undefined;
        }
      })
    }),
  }
};
