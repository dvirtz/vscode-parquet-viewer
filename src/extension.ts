'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ParquetEditorProvider } from './parquet-editor-provider';
import { getLogger, initLogger } from './logger';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  initLogger(context);
  getLogger().info('parquet-viewer activated');

  // restart logger on configuration change
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => initLogger(context)));

  context.subscriptions.push(ParquetEditorProvider.register(context));
}
