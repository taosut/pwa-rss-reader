/* eslint-disable no-restricted-globals */

import { files } from '../../build/asset-manifest';

export const APP_ENTRYPOINT = '/index.html';
export const REQUESTS_DB_NAME = 'request-store';
export const REQUESTS_TABLE = 'requests';
export const REQUESTS_SYNC_EVENT_TAG = 'sync-requests';

export const API_URL_REGEX = /\/api\//;
export const FILE_URL_REGEX = /[^/?]+\.[^/]+$/;

export const CACHES = {
  STATIC: 'static-cache-v1',
  RUNTIME: 'runtime-cache-v1',
  API: 'api-cache-v1',
};

export const STATIC_ASSETS = Object.values(files)
  .filter(asset => !asset.includes('.map') && !asset.includes('service-worker.js'))
  .map(asset => new URL(asset, location.href).href);