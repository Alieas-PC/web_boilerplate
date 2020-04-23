const { getLogger } = require('common/dist/server/log');

const logger = getLogger();

const deployEnv = process.env.DEPLOY_ENV;

const prd = {
  biz: {
    urlPrefix: 'http://localhost:8080/biz'
  },
  fileUploadServers: {
    server1: ''
  }
};

const dev = {
  biz: {
    urlPrefix: 'http://localhost:8080/biz'
  },
  fileUploadServers: {
    server1: ''
  }
};

logger.info('DEPLOY_ENV is', deployEnv);

let gatewaycfg;

switch (deployEnv) {
  case 'PRD':
    gatewaycfg = prd;
    break;
  case 'DEV':
    gatewaycfg = dev;
    break;
  default:
    logger.info('Unrecognized env param, fallback to PRD');
    gatewaycfg = prd;
}

module.exports = gatewaycfg;
