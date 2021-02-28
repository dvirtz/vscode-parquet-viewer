import * as vscode from 'vscode';
import { LogLevel } from '@vscode-logging/logger';

export function parquetTools() {
  return settings().get<string>('parquetToolsPath')!;
}

export function logPanel() {
  return settings().get<boolean>('logPanel');
}

export function logFolder() {
  return settings().get<string>('logFolder');
}

export function logLevel() {
  return settings().get<LogLevel>('logLevel')!;
}

export function settings() {
  return vscode.workspace.getConfiguration('parquet-viewer');
}
