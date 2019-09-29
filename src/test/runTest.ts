import * as path from 'path';

import { runTests } from 'vscode-test';

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionPath = path.resolve(__dirname, '../..');

    // The path to the extension test runner script
    // Passed to --extensionTestsPath
    const testRunnerPath = path.resolve(__dirname, './suite/index');

    const testWorkspace = path.resolve(extensionPath, './src/test/workspace/test.code-workspace');

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionPath, testRunnerPath, testWorkspace });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
