import { LogLevel } from '@vscode-logging/logger';
import * as vscode from 'vscode';
import { contributes, name } from '../package.json';
import { BackendName } from './backends/backend-name';
import { FormatterName } from './formatters/formatter-name';
import { GlobalState } from './global-state';
import { getLogger } from './logger';

const propertiesMeta = contributes.configuration.properties;

function settings() {
  return vscode.workspace.getConfiguration(name);
}

export function logPanel(): boolean {
  return settings().get('logging.panel', propertiesMeta['parquet-viewer.logging.panel']['default']);
}

export function logFolder(): string {
  return settings().get('logging.folder', propertiesMeta['parquet-viewer.logging.folder']['default']);
}

export async function setLogFolder(logFolder: string | undefined): Promise<void> {
  await settings().update('logging.folder', logFolder);
}

export function logLevel(): LogLevel {
  return settings().get('logging.level', propertiesMeta['parquet-viewer.logging.level']['default'] as LogLevel);
}

export async function setLogLevel(logLevel: LogLevel | undefined): Promise<void> {
  await settings().update('logging.level', logLevel);
}

export function jsonSpace(): number | string | undefined {
  return settings().get('json.space', settings().get('jsonSpace'));
}

export function backend(): BackendName {
  return settings().get('backend', propertiesMeta['parquet-viewer.backend']['default'] as BackendName);
}

export function jsonAsArray(): boolean {
  return settings().get('json.asArray', propertiesMeta['parquet-viewer.json.asArray']['default']);
}

export function format(): FormatterName {
  return settings().get('format', propertiesMeta['parquet-viewer.format']['default'] as FormatterName);
}

export function csvSeparator(): string {
  return settings().get('csv.separator', propertiesMeta['parquet-viewer.csv.separator']['default']);
}

function settingsChanged(e: vscode.ConfigurationChangeEvent, sections: string[]): boolean {
  return sections.map(s => `${name}.${s}`).some(s => e.affectsConfiguration(s));
}

export function affectsLogging(e: vscode.ConfigurationChangeEvent): boolean {
  return settingsChanged(e, ['logging', 'logLevel', 'logPanel', 'logFolder'])
}

export function affectsDocument(e: vscode.ConfigurationChangeEvent): boolean {
  return settingsChanged(e, ['backend', 'useParquetTools', 'json.space', 'json.asArray', 'csv.separator']);
}

export const DeprecationWarningActions = [
  'Open settings',
  'Ignore',
  'View documentation',
] as const;

export async function checkDeprecatedSettings(globalState: GlobalState) {
  if (globalState.areDeprecationWarningsIgnored()) {
    getLogger().warn('deprecation warning disabled');
    return;
  }

  const backendName = backend();
  if (backendName == 'parquets') {
    const action = await vscode.window.showWarningMessage(
      `Backend ${backendName} is deprecated and will be removed in a future version.
      Please switch to another backend`,
      ...DeprecationWarningActions
    );
    switch (action) {
      case 'Open settings':
        await vscode.commands.executeCommand('workbench.action.openSettings');
        break;
      case 'View documentation':
        await vscode.env.openExternal(
          vscode.Uri.parse(
            'https://github.com/dvirtz/vscode-parquet-viewer#backends'
          )
        );
        break;
      case 'Ignore':
        getLogger().warn('deprecation warning disabled');
        await globalState.ignoreDeprecationWarnings();
        break;
    }
  }
}

export function affectsDeprecation(e: vscode.ConfigurationChangeEvent): boolean {
  return settingsChanged(e, ['backend', 'useParquetTools']);
}

