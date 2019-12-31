import { makeActionCreator } from '../../util/reduxUtil';

/** Contants */
export const PREFIX = 'COMMON';

export const NAV_TO = `${PREFIX}_NAV_TO`;

export const REDIRECT_TO = `${PREFIX}_REDIRECT_TO`;

export const SHOW_TOAST = `${PREFIX}_SHOW_TOAST`;

export const INIT_APP = `${PREFIX}_INIT_APP`;

export const SET_COMMON_STATE = `${PREFIX}_SET_COMMON_STATE`;

export const SET_LOADING_STATE = `${PREFIX}_SET_LOADING_STATE`;

/** Actions */

export const navTo = makeActionCreator(NAV_TO);

export const redirectTo = makeActionCreator(REDIRECT_TO);

export const showToast = makeActionCreator(SHOW_TOAST);

export const initApp = makeActionCreator(INIT_APP);

export const setCommonState = makeActionCreator(SET_COMMON_STATE);

export const setLoadingState = makeActionCreator(SET_LOADING_STATE);

export const moduleStateActionCreator = (moduleName = 'UNKNOW') => {
  const SET_MODULE_STATE = `SET_${moduleName}_MODULE_STATE`;

  return {
    SET_MODULE_STATE,
    setModuleState: makeActionCreator(SET_MODULE_STATE)
  };
};
