import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts'],
  testTimeout: process.env.DEBUG_MODE ? 999999 : 5000
};

export default config;
