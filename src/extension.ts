'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GlobalState } from "./global-state";
import { getLogger, initLogger } from './logger';
import { ParquetEditorProvider } from './parquet-editor-provider';
import { affectsDeprecation, affectsLogging, checkDeprecatedSettings } from './settings';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  initLogger(context);
  getLogger().info('parquet-viewer activated');

  const globalState = new GlobalState(context.globalState);

  await checkDeprecatedSettings(globalState);

  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
    if (affectsLogging(e)) {
      // restart logger on log configuration change
      initLogger(context);
    }
    if (affectsDeprecation(e)) {
      checkDeprecatedSettings(globalState).catch(error => getLogger().error('failed to check deprecation settings', error));
    }
  }));

  context.subscriptions.push(ParquetEditorProvider.register(context));
}
