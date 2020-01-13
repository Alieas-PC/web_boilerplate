const { isDev } = require('common/dist/server/utils');

const gatewayCfg = require('./gatewaycfg');

const cipher = require('./cipher');

const db = require('./db');

const devConfig = {
  port: 3000,
  hotPort: 8088,
  domain: 'http://localhost:3000',
  useSSR: true,
  gateway: gatewayCfg,
  cipher: cipher.devConfig,
  db
};

const prdConfig = {
  port: 8080,
  domain: 'http://localhost:8080',
  useSSR: true,
  gateway: gatewayCfg,
  cipher: cipher.prdConfig,
  db
};

module.exports = isDev() ? devConfig : prdConfig;
