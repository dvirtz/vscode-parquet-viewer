import type { Config } from '@jest/types';
import {default as common} from '../../jest.config';

const config: Config.InitialOptions = {
  ...common,
  moduleNameMapper: {
    '^vscode$': '<rootDir>/../../node_modules/@types/vscode/index.d.ts'
  }
};

export default config;
