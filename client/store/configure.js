/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';

import { createLogger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';

import { routerMiddleware } from 'connected-react-router';

import { isPrd } from '../util/envUtil';

import createRootReducer from '../reducer';

import rootSaga from '../saga';

/** support redux-devtool browser plugin */
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export default (preloadedState, history) => {
  /** support redux logger which will track any actions and log it to the browser console  */
  const logger = createLogger({
    collapsed: true,
    duration: true
  });
  /** support saga middleware for async flow */
  const sagaMiddleware = createSagaMiddleware();
  /** support router middleware */
  const routeMiddleware = routerMiddleware(history);

  const rootReducer = createRootReducer(history);

  const store = createStore(
    rootReducer,
    preloadedState,
    !isPrd()
      ? composeEnhancers(
          applyMiddleware(logger, sagaMiddleware, routeMiddleware)
        )
      : compose(applyMiddleware(sagaMiddleware, routeMiddleware))
  );

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  // return saga task promise
  store.asyncTask = sagaMiddleware.run(rootSaga).done;

  return store;
};
