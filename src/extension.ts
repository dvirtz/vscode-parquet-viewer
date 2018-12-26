'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ParquetContentProvider } from './parquet_content_provider';
import { execFile } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('parquet-viewer activated');

  execFile('parquet-tools', ['-h'], err => {
      vscode.window.showErrorMessage('parquet-tools not in PATH');
  });

  const scheme = 'parquet';
  const provider = new ParquetContentProvider();

  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(scheme, provider));

  let onFile = function (document: vscode.TextDocument) {
    if (document.fileName.endsWith('parquet') && document.uri.scheme !== scheme) {
      let uri = vscode.Uri.parse(scheme + '://' + document.uri.path);
      vscode.window.showTextDocument(uri, { preview: true, viewColumn: vscode.window.activeTextEditor!.viewColumn });
    }
  };

  context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.viewParquetAsJson', (textEditor) => {
    let document = textEditor.document;
    if (!document.fileName.endsWith('parquet')) {
      vscode.window.showErrorMessage("Please open a parquet file");
      return; // no editor
    }
    onFile(document);
  }));

  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(onFile));

  if (vscode.window.activeTextEditor) {
    onFile(vscode.window.activeTextEditor.document);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
}