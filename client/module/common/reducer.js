import { createReducer } from '../../util/reduxUtil';

import {
  SET_COMMON_STATE,
  REDIRECT_TO,
  SET_LOADING_STATE,
  SHOW_TOAST
} from './action';

const commonReducer = createReducer(
  {
    loadings: new Set()
  },
  {
    [REDIRECT_TO]: (state, { payload: path }) => ({
      ...state,
      redirectTo: path
    }),
    [SET_LOADING_STATE]: (state, { payload: { loading, key } }) => {
      const loadings = new Set(state.loadings);

      if (loading) {
        loadings.add(key);
      } else {
        loadings.delete(key);
      }

      return {
        ...state,
        loadings
      };
    },
    [SET_COMMON_STATE]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [SHOW_TOAST]: (state, { payload: { msg: toastMsg } }) => ({
      ...state,
      toastMsg
    })
  }
);
export default commonReducer;
