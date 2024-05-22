import * as vscode from 'vscode';
import { LogLevel } from '@vscode-logging/logger';
import { BackendName } from './backends/backend-name';
import { name, contributes } from '../package.json';
import { FormatterName } from './formatters/formatter-name';

const propertiesMeta = contributes.configuration.properties;

function settings() {
  return vscode.workspace.getConfiguration(name);
}

export function parquetTools(): string | undefined {
  return settings().get('parquetToolsPath');
}

export function logPanel(): boolean {
  return settings().get('logging.panel', settings().get('logPanel', propertiesMeta['parquet-viewer.logging.panel']['default']));
}

export function logFolder(): string {
  return settings().get('logging.folder', settings().get('logFolder', ''));
}

export async function setLogFolder(logFolder: string | undefined): Promise<void> {
  await settings().update('logging.folder', logFolder);
}

export function logLevel(): LogLevel {
  return settings().get('logging.level', settings().get('logLevel', propertiesMeta['parquet-viewer.logging.level']['default'] as LogLevel));
}

export async function setLogLevel(logLevel: LogLevel | undefined): Promise<void> {
  await settings().update('logging.level', logLevel);
}

export function useParquetTools(): boolean {
  return settings().get('useParquetTools', false);
}

export function jsonSpace(): number | string | undefined {
  return settings().get('json.space', settings().get('jsonSpace'));
}

export function backend(): BackendName {
  return useParquetTools() ? 'parquet-tools' : settings().get('backend', propertiesMeta['parquet-viewer.backend']['default'] as BackendName);
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
