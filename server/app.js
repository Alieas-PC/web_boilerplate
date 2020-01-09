const path = require('path');
const koaWebpack = require('koa-webpack');
const { AppServer } = require('common');
const render = require('./middlewares/render');
const webpackCfg = require('../build/dev.config.js');
const servCfg = require('../config');
const { isPrd } = require('./utils/envUtil');

const app = new AppServer({
  projectRoot: path.resolve(__dirname, '..'),
  assetsDir: path.resolve(__dirname, '../dist/client')
});

if (!isPrd()) {
  koaWebpack({
    config: webpackCfg,
    devMiddleware: {},
    hotClient: {
      port: servCfg.hotPort
    }
  }).then(middleware => {
    app.use(middleware);
  });
}

app.use(render(servCfg.useSSR));

app.useRoutes(path.resolve(__dirname, './routes'));

app.listen(servCfg.port);
