// take, takeEvery, takeLatest, put, all, delay, fork, call
import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { CREATE_USER_START, LOAD_USERS_START } from './action-types';
import { createUserApi, loadUsersApi } from './api';
import {
  createUserError,
  createUserSuccess,
  loadUsersError,
  loadUsersSuccess,
} from './action-creators';

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

export function* onCreateUserStartAsync(action) {
  try {
    const response = yield call(createUserApi, action.payload);

    if (response.status === 200) {
      yield delay(500);
      yield put(createUserSuccess());
    }
  } catch (err) {
    yield put(createUserError(err.response.data));
  }
}

export function* onLoadUsers() {
  yield takeEvery(LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(CREATE_USER_START, onCreateUserStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
