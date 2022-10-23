import type { Config } from '@jest/types';
import { default as common } from '../../jest.config';

const config: Config.InitialOptions = {
  ...common,
};

export default config;
