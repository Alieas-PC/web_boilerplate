import 'isomorphic-fetch';

import React from 'react';

import { StaticRouter } from 'react-router';

import { Provider } from 'react-redux';

import ReactDOMServer from 'react-dom/server';

import Loadable from 'react-loadable';

import { getBundles } from 'react-loadable/webpack';

import { matchPath } from 'react-router-dom';

import { createMemoryHistory } from 'history';

import { createStore as _createStore } from 'common/dist/client/store';

import createRootReducer from './reducer';

import rootSaga from './saga';

import routes from './routes';

import App from './App';

const history = createMemoryHistory();

const rootReducer = createRootReducer(history);

export const renderToHtml = (url, store, routerCtx = {}, stats, sheets) => {
  const modules = [];

  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={url} context={routerCtx}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    )
  );

  const bundles = getBundles(stats, modules);

  return { html, bundles };
};

export const findMatch = path => {
  let match = null;

  const matchedRoute = routes.find(route => {
    match = matchPath(path, { exact: true, ...route });
    return match;
  });

  return {
    match,
    matchedRoute
  };
};

export const createStore = state =>
  _createStore(rootReducer, rootSaga, state, history);
