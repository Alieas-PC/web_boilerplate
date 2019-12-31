import { createRequestTypes, makeActionCreator } from '../../util/reduxUtil';
import { moduleStateActionCreator } from '../common/action';

export { setLoadingState, navTo, showToast } from '../common/action';

/** Contants */
export const PREFIX = '';

export const SUBMIT = createRequestTypes(`${PREFIX}_SUBMIT`);

/** Actions */
export const { SET_MODULE_STATE, setModuleState } = moduleStateActionCreator(
  PREFIX
);

const submit = makeActionCreator(SUBMIT.REQUEST);

export default {
  submit
};
