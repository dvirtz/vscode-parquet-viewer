import Module from 'module';
import path from 'path';

const originalRequire = Module.prototype.require;
const newRequire = function(this: unknown, id: string) {
  if (id === 'vscode') {
    return originalRequire(path.join(__dirname, 'mocks', 'vscode.ts'));
  }
  return originalRequire.apply(this, [id]);
};
Module.prototype.require = newRequire as typeof originalRequire;
