interface TestProcess extends NodeJS.Process {
  __VSCODE?: typeof import('vscode');
}

export const test_process = (process as TestProcess);
