import toArray from '@async-generators/to-array';
import { createReadStream } from 'fs';
import * as path from 'path';
import { createInterface } from "readline";
import { ParquetToolsBackend } from "../../src/parquet-tools-backend";

const rootDir = path.join(__dirname, '..', '..');

jest.setTimeout(60000);

jest.mock('vscode', () => {
  const getConfigurationMock = jest.fn();
  getConfigurationMock.mockReturnValue({
    get: jest.fn(name => {
      switch (name) {
        case 'parquetToolsPath':
          return path.join(rootDir, 'test', 'workspace', 'parquet-tools-1.12.0-SNAPSHOT.jar');
        default:
          return undefined;
      }
    })
  });
  return {
    workspace: {
      getConfiguration: getConfigurationMock,
    }
  };
});

describe("ParquetToolsBackend tests", () => {
  const backend = new ParquetToolsBackend();

  test.each(
    ["small", "large"]
  )('Converts %s parquet to JSON', async function (name) {
    const workspace = path.join(rootDir, 'test', 'workspace');
    const json = (await toArray(backend.toJson(path.join(workspace, `${name}.parquet`))));
    const expected = await toArray(createInterface({input: createReadStream(path.join(workspace, `${name}.json`))}));

    expect(json).toEqual(expected);
  });

  test("Error on not existing file", async function () {
    await expect(toArray(backend.toJson("no-such-file"))).rejects.toMatchObject({
      'message': expect.stringMatching(/while reading no-such-file: parquet-tools exited with code 1\n.*java.io.FileNotFoundException: File no-such-file does not exist/s)
    });
  });

  test("-h works", async function () {
    const stdout = (await ParquetToolsBackend.spawnParquetTools(['-h']).next()).value;
    expect(stdout).toContain('parquet-tools cat:');
  });
});
