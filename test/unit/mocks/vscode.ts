import { mock, Mock } from 'node:test';
import { BackendName } from '../../../src/backends/backend-name';

export const workspace = {
  mocks: {
    jsonSpace: mock.fn(() => undefined) as Mock<() => string | number | undefined>,
    jsonAsArray: mock.fn(() => undefined) as Mock<() => boolean | undefined>,
    csvSeparator: mock.fn(() => undefined) as Mock<() => string | undefined>,
    backendName: mock.fn(() => undefined) as Mock<() => BackendName | undefined>,
  },
  getConfiguration: () => ({
    get: (name: string, defaultValue?: string) => {
      switch (name) {
        case 'json.space':
          return workspace.mocks.jsonSpace() ?? defaultValue;
        case 'json.asArray':
          return workspace.mocks.jsonAsArray() ?? defaultValue;
        case 'csv.separator':
          return workspace.mocks.csvSeparator() ?? defaultValue;
        case 'backend':
          return workspace.mocks.backendName() ?? defaultValue;
        default:
          return defaultValue;
      }
    },
  }),
};

export const window = {
  showWarningMessage: mock.fn((_message: string, ..._actions: string[]) => ''),
};

export const commands = {
  executeCommand: mock.fn((_command: string, ..._rest: unknown[]) => undefined),
};

export class Uri {
  static parse = mock.fn((_value: string) => Uri);
}

export const env = {
  openExternal: mock.fn((_uri: unknown) => true),
};

export const SyncedMemento = {
  keys: mock.fn(() => []),
  get: mock.fn((_key: string, defaultValue?: unknown) => defaultValue),
  update: mock.fn(async (_key: string, _value: unknown) => undefined),
  setKeysForSync: mock.fn((_keys: readonly string[]) => undefined),
};
