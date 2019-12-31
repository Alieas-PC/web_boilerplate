import React from 'react';

import ReactDOM from 'react-dom';

import { ConnectedRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';

import createStore from './store';

import App from './App';

const preloadedState =
  typeof window !== 'undefined' ? window.REDUX_PRELOADED_STATE : {};

const history = createBrowserHistory();

const store = createStore(
  /**
   * preloadedState
   */
  preloadedState,
  history
);

const renderDom = () => {
  const reactEle = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  const container = document.querySelector('#root');
  // we assume it is server side render if the preloadedState is not empty.
  if (preloadedState && Object.keys(preloadedState).length !== 0) {
    ReactDOM.hydrate(reactEle, container, () => {
      store.initApp();
    });
  } else {
    ReactDOM.render(reactEle, container, () => {
      store.initApp();
    });
  }
};

if (module.hot) {
  // enable MHR
  module.hot.accept('./App', () => renderDom());
}

renderDom();
