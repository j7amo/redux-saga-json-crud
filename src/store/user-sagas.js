// take, takeEvery, takeLatest, put, all, delay, fork, call
import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import { LOAD_USERS_START } from './action-types';
import loadUsersApi from './api';
import { loadUsersError, loadUsersSuccess } from './action-creators';

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);

    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (err) {
    yield put(loadUsersError(err.response.data));
  }
}

export function* onLoadUsers() {
  yield takeEvery(LOAD_USERS_START, onLoadUsersStartAsync);
}

const userSagas = [fork(onLoadUsers)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
