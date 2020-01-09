const fetchUtil = require('../utils/fetchUtil');

const forwardRequest = async (ctx, url) => {
  try {
    const { method } = ctx;

    ctx.logger.info(`${method} data from/to remote server`);

    ctx.logger.info(`Forward to => ${url}`);

    const data = Object.keys(ctx.request.body).length
      ? ctx.request.body
      : ctx.query;

    ctx.logger.info(`Forward request Query => ${JSON.stringify(ctx.query)}`);

    ctx.logger.info(
      `Forward request Body => ${JSON.stringify(ctx.request.body)}`
    );

    const res = await fetchUtil[method.toLowerCase()](
      url,
      data,
      ctx.request.type
    );

    ctx.logger.longInfo(
      `Response data from remote server => ${JSON.stringify(res)}`
    );

    ctx.body = res;

    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    ctx.logger.error(`Error occurred, ${e.message}`);
  }
};

module.exports = forwardRequest;
