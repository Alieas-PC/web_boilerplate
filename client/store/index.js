import { END } from 'redux-saga';

import { initApp } from '../module/common/action';

import createStore from './configure';

export { history } from './configure';

export default (...args) => {
  const store = createStore(...args);

  store.initApp = ctx => {
    store.dispatch(initApp(ctx));
  };

  store.end = async () => {
    store.dispatch(END);

    await store.asyncTask;
  };

  return store;
};
