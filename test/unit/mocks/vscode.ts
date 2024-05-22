import * as path from 'path';
import { root as workspacePath } from '../workspace';
import { mock, Mock } from 'node:test';

export const jsonSpaceMock: Mock<() => unknown> = mock.fn();
export const jsonAsArrayMock: Mock<() => unknown> = mock.fn();
export const csvSeparatorMock = mock.fn();

export const workspace = {
  getConfiguration: () => ({
    get: (name: string, defaultValue?: string) => {
      switch (name) {
        case 'parquetToolsPath':
          return path.join(workspacePath, 'parquet-tools-1.12.0-SNAPSHOT.jar');
        case 'json.space':
          return jsonSpaceMock() ?? defaultValue;
        case 'json.asArray':
          return jsonAsArrayMock() ?? defaultValue;
        case 'csv.separator':
          return csvSeparatorMock() ?? defaultValue;
        default:
          return defaultValue;
      }
    },
  }),
};
