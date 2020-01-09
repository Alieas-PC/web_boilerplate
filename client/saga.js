import { all, fork } from 'redux-saga/effects';

import commonSaga from 'common/dist/client/saga';

import { importDynamicSagas } from './utils/dynamic-loader';

export default function*() {
  yield all([fork(commonSaga), ...importDynamicSagas()]);
}
