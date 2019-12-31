/* eslint-disable no-param-reassign */
import { takeLatest, all, select, call, put, fork } from 'redux-saga/effects';

import * as action from './action';
import * as service from './service';
import { callService } from '../common/service-helper';

function* submit() {
  yield* callService(service.test, {}, action.SUBMIT, {
    loadingKey: 'sample'
  });
}

export default fork(function* saga() {
  yield all([takeLatest(action.SUBMIT.REQUEST, submit)]);
});
