/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import * as meta from "../../package.json";
import { BackendNames } from "../../src/backends/backend-name";
import {
  checkDeprecatedSettings,
  DeprecationWarningActions,
} from "../../src/settings";
import {
  workspace,
  window,
  commands,
  env,
  SyncedMemento,
} from "./mocks/vscode";
import { Uri } from "vscode";
import { GlobalState } from "../../src/global-state";

void describe("settings", () => {
  test("should have all backend names", () => {
    assert.deepEqual(
      meta.contributes.configuration.properties["parquet-viewer.backend"].enum,
      Array.from(BackendNames)
    );
  });

  test("show deprecated settings message", async () => {
    // by default deprecated settings are not set
    const globalState = new GlobalState(SyncedMemento);
    await checkDeprecatedSettings(globalState);
    assert.equal(window.showWarningMessage.mock.callCount(), 0);

    for (const action of DeprecationWarningActions) {
      // set backend to a deprecated one and check a warning is shown
      const backendName = "parquet-tools";
      workspace.mocks.backendName.mock.mockImplementation(() => backendName);

      window.showWarningMessage.mock.mockImplementation(
        (message, ...actions) => {
          assert.match(
            message,
            new RegExp(`Backend ${backendName} is deprecated`)
          );
          assert.deepEqual(actions, DeprecationWarningActions);
          return action;
        }
      );

      await checkDeprecatedSettings(globalState);

      assert.equal(window.showWarningMessage.mock.callCount(), 1);
      switch (action) {
        case "Open settings":
          assert.equal(commands.executeCommand.mock.callCount(), 1);
          assert.deepEqual(commands.executeCommand.mock.calls[0].arguments, [
            "workbench.action.openSettings",
          ]);
          break;
        case "View documentation":
          assert.equal(env.openExternal.mock.callCount(), 1);
          assert.deepEqual(env.openExternal.mock.calls[0].arguments, [
            Uri.parse(
              "https://github.com/dvirtz/vscode-parquet-viewer#backends"
            ),
          ]);
          break;
        case "Ignore":
          assert.equal(SyncedMemento.update.mock.callCount(), 1);
          assert.deepEqual(SyncedMemento.update.mock.calls[0].arguments, [
            GlobalState.IgnoreDeprecationWarningKey,
            true,
          ]);
          break;
      }

      window.showWarningMessage.mock.resetCalls();
      commands.executeCommand.mock.resetCalls();
      env.openExternal.mock.resetCalls();
    }
  });
});
