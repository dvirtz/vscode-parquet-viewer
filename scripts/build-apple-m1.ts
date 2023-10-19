import * as https from 'https';
import * as unzipper from 'unzipper';
import { constants as HTTP_CONSTANTS } from 'http2';
import { assert } from 'console';

const API_TOKEN = process.env.CODEMAGIC_API_KEY;
const APP_NAME = 'vscode-parquet-viewer';

async function request<T>(options: https.RequestOptions, field: string, body?: string) {
  return new Promise<T>((resolve, reject) => {
    const req = https.request(options, res => {
      if (res.statusCode != 200) {
        reject(`accessing ${options.path}: ${res.statusMessage}`);
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data)[field] as T);
      });
    }).on('error', (error) => {
      reject(error);
    });
    req.end(body);
  });
}

async function get<T = unknown>(path: string, field: string) {
  const options = {
    hostname: 'api.codemagic.io',
    port: 443,
    method: 'GET',
    path: `/${path}`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': API_TOKEN,
    },
  };
  return await request<T>(options, field);
}

async function post<T = unknown>(path: string, field: string, data: Object) {
  const body = JSON.stringify(data);
  const options = {
    hostname: 'api.codemagic.io',
    port: 443,
    method: 'POST',
    path: `/${path}`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'x-auth-token': API_TOKEN,
    },
  };
  return await request<T>(options, field, body);
}

async function getAppId() {
  const apps = await get<{ appName: string, _id: string }[]>('apps', 'applications');

  const app = apps.find((app) => app.appName === APP_NAME);

  if (app) {
    return app._id;
  } else {
    throw new Error(`No app found with the name ${APP_NAME}`);
  }
}

async function startBuild(appId: string) {
  const buildId = await post<string>('builds', 'buildId', {
    appId: appId,
    workflowId: 'apple-m1',
    branch: process.env.BRANCH_NAME
  });
  console.log(`started build ${buildId}`);
  return buildId;
}

async function waitForBuild(buildId: string) {
  type Status = 'building' | 'canceled' | 'finishing' | 'finished' | 'failed' | 'fetching' | 'preparing' | 'publishing' | 'queued' | 'skipped' | 'testing' | 'timeout' | 'warning';
  let build: { status: Status };
  process.stdout.write('waiting for build to finish');
  do {
    // sleep 5 seconds
    process.stdout.write('.');
    await new Promise(resolve => setTimeout(resolve, 5000));
    build = await get<typeof build>(`builds/${buildId}`, 'build');
  } while (['finished', 'canceled', 'failed', 'skipped', 'timeout'].indexOf(build.status) == -1);
  process.stdout.write(`\nfinished with status ${build.status}\n`);
  return build.status == 'finished';
}

async function downloadArtifacts(appId: string, buildId: string) {
  const builds = await get<[{ _id: string, artefacts: { name: string, url: string }[] }]>(`/builds?appId=${appId}&branch=${process.env.BRANCH_NAME}`, 'builds');

  const artifacts = builds.filter(build => build._id == buildId)[0].artefacts;

  if (artifacts.length === 0) {
    console.log('No artifacts found for the last build');
    return;
  }

  const artifact = artifacts[0];

  function download(url: string, resolve: (value: string) => void, reject: (reason: any) => void) {
    https.get(url, {
      headers: {
        'x-auth-token': API_TOKEN,
      },
    }, (res) => {
      assert(res.statusCode);
      if ([HTTP_CONSTANTS.HTTP_STATUS_FOUND, HTTP_CONSTANTS.HTTP_STATUS_TEMPORARY_REDIRECT, HTTP_CONSTANTS.HTTP_STATUS_PERMANENT_REDIRECT].indexOf(res.statusCode!) != -1) {
        return download(res.headers.location!, resolve, reject);
      }
      else if (res.statusCode! >= 400) {
        return reject(new Error(`Failed to download artifact: ${res.statusCode}: ${res.statusMessage}`));
      }

      res.pipe(unzipper.Extract({ path: process.cwd() }))
        .promise()
        .then(() => resolve(artifact.name))
        .catch(reject);
    }).on('error', (error) => {
      reject(error);
    });
  };

  const fileName = await
    await new Promise((resolve, reject) => download(artifact.url, resolve, reject));
  console.log(`extracted ${fileName}`)
}

async function main() {
  const appId = await getAppId();
  const buildId = await (async () => {
    if (process.argv.length > 2 && process.argv[2] == '--build-id') {
      return process.argv[3];
    }
    return await startBuild(appId);
  })();
  const isSuccessful = await waitForBuild(buildId);
  if (isSuccessful) {
    await downloadArtifacts(appId, buildId);
  }
  else {
    throw new Error('build failed');
  }
}

main().catch(error => {
  console.error(error)
  throw error;
});
