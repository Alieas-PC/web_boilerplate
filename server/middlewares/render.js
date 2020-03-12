const { extname } = require('path');
const {
  renderToHtml,
  findMatch,
  createStore
} = require('../../dist/server/index.server');

const config = require('../../config');

module.exports = (useServerRender = true, apiPrefix) => {
  // add domain field onto process.env so that fetchUtil can use it to prefix requests's urls.
  process.env.domain = config.domain;

  // eslint-disable-next-line global-require
  const stats = require('../../dist/react-loadable.json');

  return async (ctx, next) => {
    const state = {};

    if (useServerRender) {
      const { match, matchedRoute } = findMatch(ctx.path);

      if (!matchedRoute) {
        return next();
      }

      const store = createStore(state);

      store.initApp(ctx);

      let fetchInit = null;

      if (matchedRoute.async) {
        const component = (await matchedRoute.loader.preload()).default;

        if (typeof component.fetchInitData === 'function') {
          fetchInit = component.fetchInitData;
        }
      } else {
        const { component } = matchedRoute;

        if (typeof component.fetchInitData === 'function') {
          fetchInit = component.fetchInitData;
        }
      }

      if (fetchInit) {
        store.dispatch(
          fetchInit({
            match,
            state: store.getState()
          })
        );
      }

      await store.end();

      const routerCtx = {};

      const { html, bundles } = renderToHtml(ctx.url, store, routerCtx, stats);

      // there's a redirect action triggered from saga
      if (routerCtx.url) {
        ctx.status = 302;

        ctx.redirect(routerCtx.url);

        return null;
      }

      // wait for the promise's return
      await ctx.render('index.generated', {
        html,
        bundlesTags: bundles
          .map(bundle =>
            extname(bundle.publicPath) === '.css'
              ? `<link href="${bundle.publicPath}" rel="stylesheet" />`
              : `<script src="${bundle.publicPath}"></script>`
          )
          .join('\n'),
        state: store.getState()
      });

      return null;
    } else if (!ctx.path.startsWith(apiPrefix)) {
      const { matchedRoute } = findMatch(ctx.path);

      if (!matchedRoute) {
        return next();
      }

      ctx.logger.info('Use client route, fallback to index.generated.html');
      // wait for the promise's return
      await ctx.render('index.generated', {
        html: null,
        state
      });
      return null;
    }

    return next();
  };
};
