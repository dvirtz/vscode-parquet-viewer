import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
  const projectPath = path.resolve(__dirname, '../..');
  try {
    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath: projectPath,
      extensionTestsPath: path.resolve(__dirname, './suite/index'),
      launchArgs: [
        path.resolve(projectPath, './test/workspace')
      ]
    });
  } catch (err) {
    console.error(err);
    console.error('Failed to run tests');
    process.exit(1);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
