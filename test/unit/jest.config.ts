import type { Config } from '@jest/types';
import * as path from 'path';
import {default as common} from '../../jest.config';

const config: Config.InitialOptions = {
  ...common,
  roots: [path.join(__dirname, 'test', 'unit')],
  moduleNameMapper: {
    '^vscode$': '<rootDir>/node_modules/@types/vscode/index.d.ts'
  }
};

export default config;
