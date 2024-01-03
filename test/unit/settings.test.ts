import { describe, expect, it } from "@jest/globals";
import * as meta from '../../package.json';
import { BackendNames } from "../../src/backends/backend-name";

describe('settings', () => {
  it ('should have all backend names', () => {
    expect(meta.contributes.configuration.properties['parquet-viewer.backend'].enum).toEqual(Array.from(BackendNames));
  });
});
