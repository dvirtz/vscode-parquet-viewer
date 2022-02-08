
import toArray from '@async-generators/to-array';
import { createReadStream } from 'fs';
import * as path from 'path';
import { createInterface } from 'readline';
import { ParquetsBackend } from '../../src/parquets-backend';


const rootDir = path.join(__dirname, '..', '..');

jest.mock('vscode', () => {
  const getConfigurationMock = jest.fn();
  getConfigurationMock.mockReturnValue({
    get: jest.fn()
  });
  return {
    workspace: {
      getConfiguration: getConfigurationMock,
    }
  };
});

describe("ParquetsBackend tests", () => {
  const backend = new ParquetsBackend();

  test.each(
    ["small", "large"]
  )('Converts %s parquet to JSON', async function (name) {
    const workspace = path.join(rootDir, 'test', 'workspace');
    const json = (await toArray(backend.toJson(path.join(workspace, `${name}.parquet`)))).map(line => line.trim());
    const expected = await toArray(createInterface({input: createReadStream(path.join(workspace, `${name}.json`))}));

    expect(json).toEqual(expected);
  });

  test("Error on not existing file", async function () {
    await expect(toArray(backend.toJson("no-such-file"))).rejects.toMatchObject({
      'message': expect.stringMatching(/while reading no-such-file: Error: ENOENT: no such file or directory, stat '.*no-such-file'/)
    });
  });
});
