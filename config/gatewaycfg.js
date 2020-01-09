const logger = require('../server/utils/logUtil');

const deployEnv = process.env.DEPLOY_ENV;

const prd = {
  biz: {
    urlPrefix: 'http://152.32.251.57:11919/leader-service'
  },
  fileUploadServers: {
    server1: ''
  }
};

const dev = {
  biz: {
    urlPrefix: 'http://192.168.31.173:11919/leader-service'
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
