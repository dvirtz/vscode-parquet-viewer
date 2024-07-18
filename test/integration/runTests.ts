import { runTests } from '@vscode/test-electron';
import * as path from 'path';
import * as meta from '../../package.json';

export async function run(): Promise<void> {
  const vscode = await import('vscode');
  const pattern = process.env.TEST_GLOB_PATTERN || '*.test.[jt]s';
  try {
    if (process.env.TEST_SUBPROCESS) {
      const { run: runNodeTests } = await import('node:test');
      const { glob } = await import('glob');
      const { spec } = await import('node:test/reporters');
      const { finished } = await import('stream/promises')
      await finished(runNodeTests({
        files: await glob(pattern, { cwd: __dirname, absolute: true }),
        concurrency: false,
        inspectPort: process.debugPort,
      })
        .compose(new spec)
        .pipe(process.stdout));
    } else {
      const { globIterate } = await import('glob');
      for await (const test of globIterate(pattern, { cwd: __dirname })) {
        const { runTest } = await import(`./${test}`);
        await runTest();
      }
      process.emit('beforeExit', Number(process.exitCode));
    }
  } finally {
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");
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
      platform: process.platform == 'win32' ? 'win32-x64-archive' : undefined,
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
