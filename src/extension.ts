'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ParquetEditorProvider } from './parquet-editor-provider';
import { ParquetToolsRunner } from './parquet-tools-runner';
import { getLogger, initLogger } from './logger';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  initLogger(context);
  getLogger().info('parquet-viewer activated');

  // restart logger on configuration change
  vscode.workspace.onDidChangeConfiguration(() => initLogger(context));

  const parquetTools = await ParquetToolsRunner.spawnParquetTools(['-h']);
  parquetTools.on('error', async (err: string) => {
    const message = `parquet-tools not in PATH ('${err}')`;
    getLogger().error(message);
    await vscode.window.showErrorMessage(message);
  });

  context.subscriptions.push(ParquetEditorProvider.register(context));
}
