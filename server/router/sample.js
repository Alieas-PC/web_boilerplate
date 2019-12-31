const Router = require('koa-router');

const router = new Router({ prefix: '/sample' });

router.all('/test', async (ctx, next) => {
  ctx.body = {
    success: true
  };

  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  return next();
});

module.exports = router;
