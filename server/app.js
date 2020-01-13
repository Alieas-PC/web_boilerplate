const path = require('path');
const { AppServer } = require('common');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const { isPrd } = require('common/dist/server/utils');
const Loadable = require('react-loadable');
const render = require('./middlewares/render');
const webpackCfg = require('../build/dev.config.js');
const servCfg = require('../config');

function startServer(app) {
  app.use(render(servCfg.useSSR, '/api/'));

  app.useModels(path.resolve(__dirname, './models'), servCfg.db);

  app.useRoutes(path.resolve(__dirname, './routes'));

  Loadable.preloadAll().then(() => {
    app.listen(servCfg.port);
  });
}

const app = new AppServer({
  assetsDir: path.resolve(__dirname, '../dist/client')
});

if (!isPrd()) {
  const compiler = webpack(webpackCfg);

  koaWebpack({
    compiler,
    devMiddleware: {
      serverSideRender: servCfg.useSSR
    },
    hotClient: {
      port: servCfg.hotPort
    }
  }).then(middleware => {
    app.use(middleware);
  });

  // wait for the first compilation ends
  let isFirstTime = true;

  compiler.hooks.emit.tap('rljson', () => {
    if (isFirstTime) {
      isFirstTime = false;

      startServer(app);
    }
  });
} else {
  startServer(app);
}
