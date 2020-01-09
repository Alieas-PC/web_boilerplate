const Router = require('koa-router');
const forwardRequest = require('../controllers/forward');
const { gateway } = require('../../config');

const router = new Router({ prefix: '/biz' });

router.all('*', async (ctx, next) => {
  const url = `${gateway.biz.urlPrefix}${ctx.path.replace('/api/biz', '')}`;

  await forwardRequest(ctx, url);

  return next();
});

module.exports = router;
