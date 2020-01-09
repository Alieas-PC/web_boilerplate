import {
  createRequestTypes,
  makeActionCreator
} from 'common/dist/client/utils/reduxUtil';

import { moduleStateActionCreator } from 'common/dist/client/action';

export { setLoadingState, navTo, showToast } from 'common/dist/client/action';

/** Contants */
export const PREFIX = 'SAMPLE';

export const SUBMIT = createRequestTypes(`${PREFIX}_SUBMIT`);

/** Actions */
export const { SET_MODULE_STATE, setModuleState } = moduleStateActionCreator(
  PREFIX
);

const submit = makeActionCreator(SUBMIT.REQUEST);

export default {
  submit
};
