import type { Config } from '@jest/types';
// import * as path from 'path';
import {default as common} from '../../jest.config';

const config: Config.InitialOptions = {
  ...common,
  // roots: [path.join(__dirname, 'test', 'unit')]
};

export default config;
