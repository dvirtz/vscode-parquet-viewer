import * as path from 'path';
import { runCLI } from 'jest';
import { runTests } from '@vscode/test-electron';
import type { Config } from '@jest/types';
import { test_process } from './test-process';
import * as meta from '../../package.json';

export async function run(): Promise<void> {
  // jest doesn't seem to provide a way to inject global/dynamic imports.
  // Basically if we have a `require`, jest assumes that it is a module on disc.
  // However `vscode` isn't a module in disc, its provided by vscode host environment.
  // Hack - put vscode namespace into global variable `process`, and re-export as as mock in jest (see __mocks__/vscode.ts).
  // Using global variables don't work, as jest seems to fiddle with that as well.
  test_process.__VSCODE = require('vscode');

  try {
    // Run the mocha test
    const { results } = await runCLI({ runInBand: true } as Config.Argv, [path.join(__dirname, '..', '..', '..', 'test', 'integration')]);
    for (const suite of results.testResults) {
      for (const test of suite.testResults) {
        if (test.status == 'passed') {
          console.info(`  ● ${test.ancestorTitles} › ${test.title} (${test.status})`);
        }
        else {
          console.error(`in ${suite.testFilePath}:`);
          console.error(`  ● ${test.ancestorTitles} › ${test.title} (${test.status})`);
          console.error(test.failureMessages.join('\n'));
        }
      }
      if (suite.failureMessage) {
        console.error(`in ${suite.testFilePath}:`);
        console.error(suite.failureMessage);
      }
    }
    if (!results.success) {
      throw new Error(`${results.numFailedTestSuites} tests failed.`);
    }
  } finally {
    await test_process.__VSCODE?.commands.executeCommand("workbench.action.closeAllEditors");
    delete test_process.__VSCODE;
  }
}

async function main() {
  const projectPath = path.resolve(__dirname, '../../..');
  try {
    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath: projectPath,
      extensionTestsPath: __filename,
      launchArgs: [
        path.resolve(projectPath, './test/workspace'),
				"--disable-extensions"
      ],
      version: meta.engines.vscode.replace(/^(\^|~)/, ''),
      platform: process.platform == 'win32' ? 'win32-x64-archive' : undefined
    });
  } catch (err) {
    console.error(err);
    console.error('Failed to run tests');
    process.exit(1);
  }
}

// run main() if called directly from node. Useful if running tests from CLI
if (require.main === module) {
  void main()
}
