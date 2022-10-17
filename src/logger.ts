/**
 * This file manages the logger's state.
 */
import { ExtensionContext, OutputChannel, window } from "vscode";
import { IChildLogger, IVSCodeExtLogger } from "@vscode-logging/types";
import { NOOP_LOGGER } from "@vscode-logging/wrapper";
import { logFolder, logPanel, logLevel } from './settings';
import { getExtensionLogger } from '@vscode-logging/logger';
import packageInfo from '../package.json';

// On file load we initialize our logger to `NOOP_LOGGER`
// this is done because the "real" logger cannot be initialized during file load.
// only once the `activate` function has been called in extension.ts
// as the `ExtensionContext` argument to `activate` contains the required `logPath`
let loggerImpel: IVSCodeExtLogger = NOOP_LOGGER;
let loggerPanel: OutputChannel | undefined = undefined;

export function getLogger(): IChildLogger {
  return loggerImpel;
}

function setLogger(newLogger: IVSCodeExtLogger): void {
  loggerImpel = newLogger;
}

function getPanel(name: string): OutputChannel {
  if (!loggerPanel) {
    loggerPanel = window.createOutputChannel(name);
  }
  return loggerPanel;
}

export function initLogger(context?: ExtensionContext): void {
  setLogger(getExtensionLogger({
    extName: packageInfo.name,
    level: logLevel(),
    logPath: logFolder() || context?.logUri.fsPath,
    logOutputChannel: logPanel() ? getPanel(packageInfo.displayName) : undefined
  }));
}
