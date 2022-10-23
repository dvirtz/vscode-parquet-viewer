import type { Config } from '@jest/types';
import * as path from 'path';
import {default as common} from '../../jest.config';

const config: Config.InitialOptions = {
  ...common,
  moduleNameMapper: {
    '^vscode$': `${path.join(__dirname, '..', '..')}/node_modules/@types/vscode/index.d.ts`
  }
};

export default config;
