import * as path from 'path';
import { workspace as workspacePath } from '../workspace';
import { mock, Mock } from 'node:test';

export const jsonSpaceMock: Mock<() => unknown> = mock.fn();
export const jsonAsArrayMock: Mock<() => unknown> = mock.fn();

export const workspace = {
  getConfiguration: () => ({
    get: (name: string) => {
      switch (name) {
        case 'parquetToolsPath':
          return path.join(workspacePath, 'parquet-tools-1.12.0-SNAPSHOT.jar');
        case 'json.space':
          return jsonSpaceMock();
        case 'json.asArray':
          return jsonAsArrayMock();
        default:
          return undefined;
      }
    },
  }),
};
