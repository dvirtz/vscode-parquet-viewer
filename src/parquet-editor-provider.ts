import * as vscode from "vscode";
import { Disposable } from "./dispose";
import { getLogger } from './logger';
import { ParquetTextDocumentContentProvider } from './parquet-document-provider';
import { format } from "./settings";
import { getNonce } from './util';
class CustomParquetDocument extends Disposable implements vscode.CustomDocument {
  uri: vscode.Uri;
  path: string;

  constructor(uri: vscode.Uri) {
    super();
    this.uri = uri;
    this.path = `${uri.fsPath}.as.${format()}`;
  }

  public async open() {
    getLogger().info(`opening ${this.path}`);
    await vscode.window.showTextDocument(
      this.uri.with({ scheme: 'parquet', path: `${this.path}` })
    );
  }
}

export class ParquetEditorProvider implements vscode.CustomReadonlyEditorProvider<CustomParquetDocument> {

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

  async openCustomDocument(uri: vscode.Uri): Promise<CustomParquetDocument> {
    return new CustomParquetDocument(uri);
  }

  async resolveCustomEditor(
    document: CustomParquetDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);

    webviewPanel.webview.onDidReceiveMessage(e => this.onMessage(document, e));

    await document.open();
  }

  private async onMessage(document: CustomParquetDocument, message: string) {
    switch (message) {
      case 'clicked':
        await document.open();
        break;
    }
  }

  private getHtmlForWebview(webview: vscode.Webview, document: CustomParquetDocument): string {
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
    <p>Click <a href="${document.path}" id="here">here</a> to view contents</p>
    <script nonce="${nonce}">
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
