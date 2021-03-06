import * as vscode from "vscode";
import * as path from 'path';
import { getNonce } from './util';
import { Disposable } from "./dispose";
import { ParquetTextDocumentContentProvider } from './parquet-document-provider';
import { ParquetToolsBackend } from './parquet-tools-backend';
import { ParquetsBackend } from './parquets-backend';
import toArray from '@async-generators/to-array';
import { getLogger } from './logger';
import { useParquetTools } from "./settings";

class DummyDocument extends Disposable implements vscode.CustomDocument {
  uri: vscode.Uri;
  path: string;

  constructor(uri: vscode.Uri) {
    super();
    this.uri = uri;
    this.path = uri.fsPath;
  }

  private async open() {
    getLogger().info(`opening ${this.path}.as.json`);
    await vscode.window.showTextDocument(
      this.uri.with({ scheme: 'parquet', path: this.path + '.as.json' })
    );
  }

  private async * toJson(parquetPath: string, token?: vscode.CancellationToken): AsyncGenerator<string> {
    if (useParquetTools()) {
      yield* ParquetToolsBackend.toJson(parquetPath, token);
    }

    yield* ParquetsBackend.toJson(parquetPath, token);
  }

  public async show() {
    getLogger().info(`showing ${this.path}.as.json`);
    if (ParquetTextDocumentContentProvider.has(this.path)) {
      return await this.open();
    }

    try {
      return await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `opening ${path.basename(this.path)}`,
        cancellable: true
      },
        async (progress, token) => {
          const json = await toArray(this.toJson(this.path, token));
          if (!token.isCancellationRequested) {
            ParquetTextDocumentContentProvider.add(this.path, json.join(''));
            await this.open();
          }
        });
    } catch (err) {
      await vscode.window.showErrorMessage(err);
    }
  }

  dispose(): void {
    super.dispose();
  }
}

export class ParquetEditorProvider implements vscode.CustomReadonlyEditorProvider<DummyDocument> {

  private static readonly viewType = 'parquetViewer.parquetViewer';

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    getLogger().info('registering ParquetEditorProvider as parquet document viewer');
    const provider = new ParquetEditorProvider;
    const providerRegistration = vscode.window.registerCustomEditorProvider(ParquetEditorProvider.viewType, provider);

    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider('parquet', new ParquetTextDocumentContentProvider)
    );

    return providerRegistration;
  }

  async openCustomDocument(uri: vscode.Uri): Promise<DummyDocument> {
    return new DummyDocument(uri);
  }

  async resolveCustomEditor(
    document: DummyDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);

    webviewPanel.webview.onDidReceiveMessage(e => this.onMessage(document, e));

    await document.show();
  }

  private async onMessage(document: DummyDocument, message: string) {
    switch (message) {
      case 'clicked':
        await document.show();
        break;
    }
  }

  private getHtmlForWebview(webview: vscode.Webview, document: DummyDocument): string {
    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    const res = /* html */`
<!DOCTYPE html>
<html>
  <head>
    <title>browser-amd-editor</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <!-- <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src ${webview.cspSource} 'nonce-${nonce}'; img-src ${webview.cspSource}; style-src 'unsafe-inline' ${webview.cspSource};"> -->
    </head>
  <body>
    <p>Click <a href="${path.basename(document.uri.fsPath)}.as.json" id="here">here</a> to open JSON</p>
    <script nonce="${nonce}">
      //# sourceURL=to-json.js
      const vscode = acquireVsCodeApi();
      document.getElementById('here').addEventListener('click', _ => {
        vscode.postMessage('clicked');
      });
    </script>
  </body>
</html>`;
    return res;
  }


}
