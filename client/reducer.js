import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import { connectRouter } from 'connected-react-router';

import commonReducer from './module/common/reducer';

import { importDynamicReducers } from './util/dynamic-loader';

const reducers = importDynamicReducers();

export default history =>
  combineReducers({
    module: combineReducers(reducers),
    common: commonReducer,
    form: formReducer,
    router: connectRouter(history)
  });
