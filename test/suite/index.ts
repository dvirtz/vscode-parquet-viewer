import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob-promise';
import { env } from 'process';
import { commands } from 'vscode';

export async function run(): Promise<void> {
  // Create the mocha test
  const options: Mocha.MochaOptions = {
    ui: 'tdd',
    color: true
  };
  if (env.MOCHA_DISABLE_TIMEOUTS) {
    options.timeout = 0;
  } else {
    options.timeout = 20000;
  }
  const mocha = new Mocha(options);

  const testsRoot = path.resolve(__dirname, '..');

  const files = await glob('**/**.test.js', { cwd: testsRoot });

  // Add files to the test suite
  files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

  try {
    // Run the mocha test
    return await new Promise((c, e) => {
      // Run the mocha test
      mocha.run(failures => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    });
  } finally {
    await commands.executeCommand("workbench.action.closeAllEditors");
  }
}
