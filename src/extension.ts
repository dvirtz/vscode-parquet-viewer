'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ParquetEditorProvider } from './parquet-editor-provider';
import { ParquetToolsRunner } from './parquet-tools-runner';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('parquet-viewer activated');

  ParquetToolsRunner.spawnParquetTools(['-h']).then(process => process.on('error', (err: string) => {
    vscode.window.showErrorMessage('parquet-tools not in PATH (' + err + ')');
  }));

  context.subscriptions.push(ParquetEditorProvider.register(context));
}
