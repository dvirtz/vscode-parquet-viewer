import * as vscode from 'vscode';
import { LogLevel } from '@vscode-logging/logger';

function settings() {
  return vscode.workspace.getConfiguration('parquet-viewer');
}

export function parquetTools(): string | undefined {
  return settings().get('parquetToolsPath');
}

export async function setParquetTools(parquetTools: string | undefined): Promise<void> {
  await settings().update('parquetToolsPath', parquetTools);
}

export function logPanel() : boolean {
  return settings().get('logPanel', false);
}

export async function setLogPanel(logPanel: boolean | undefined): Promise<void> {
  await settings().update('logPanel', logPanel);
}

export function logFolder() : string | undefined {
  return settings().get('logFolder');
}

export async function setLogFolder(logFolder: string | undefined): Promise<void> {
  await settings().update('logFolder', logFolder);
}

export function logLevel() : LogLevel {
  return settings().get('logLevel', 'info');
}

export async function setLogLevel(logLevel : LogLevel | undefined): Promise<void> {
  await settings().update('logLevel', logLevel);
}

export function useParquetTools(): boolean {
  return settings().get('useParquetTools', false);
}
