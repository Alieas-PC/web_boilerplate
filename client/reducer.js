import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import { connectRouter } from 'connected-react-router';

import commonReducer from 'common/dist/client/reducer';

import { importDynamicReducers } from './utils/dynamic-loader';

const reducers = importDynamicReducers();

export default history =>
  combineReducers({
    module: combineReducers(reducers),
    common: commonReducer,
    form: formReducer,
    router: connectRouter(history)
  });
