import * as vscode from 'vscode';

type SyncedMemento = vscode.ExtensionContext['globalState'];

export class GlobalState {
  private globalState: SyncedMemento;

  static readonly IgnoreDeprecationWarningKey = 'ignore deprecation warning';

  constructor(globalState: SyncedMemento) {
    this.globalState = globalState;
    this.globalState.setKeysForSync([GlobalState.IgnoreDeprecationWarningKey]);
  }

  public areDeprecationWarningsIgnored(): boolean {
    return this.globalState.get(GlobalState.IgnoreDeprecationWarningKey, false);
  }

  public async ignoreDeprecationWarnings() {
    await this.globalState.update(
      GlobalState.IgnoreDeprecationWarningKey,
      true
    );
  }
}
