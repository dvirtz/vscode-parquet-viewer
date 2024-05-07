import { test } from "node:test";
import { strict as assert } from 'node:assert';
import * as meta from '../../package.json';
import { BackendNames } from "../../src/backends/backend-name";

void test('settings', async (context) => {
  await context.test('should have all backend names', () => {
    assert.deepEqual(meta.contributes.configuration.properties['parquet-viewer.backend'].enum, Array.from(BackendNames));
  });
});
