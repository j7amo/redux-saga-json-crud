import {
  all,
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import {
  CREATE_USER_START,
  DELETE_USER_START,
  LOAD_USERS_START,
  UPDATE_USER_START,
} from './action-types';
import {
  createUserApi,
  deleteUserApi,
  loadUsersApi,
  updateUserApi,
} from './api';
import {
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  loadUsersError,
  loadUsersSuccess,
  updateUserError,
  updateUserSuccess,
} from './action-creators';

function* onLoadUsersStartAsync() {
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

function* onCreateUserStartAsync(action) {
  try {
    const response = yield call(createUserApi, action.payload);

    if (response.status === 201) {
      yield delay(500);
      yield put(createUserSuccess());
    }
  } catch (err) {
    yield put(createUserError(err.response.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);

    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (err) {
    yield put(deleteUserError(err.response.data));
  }
}

function* onUpdateUserStartAsync({ payload: { userId, userInfo } }) {
  try {
    const response = yield call(updateUserApi, userId, userInfo);

    if (response.status === 200) {
      yield delay(500);
      yield put(updateUserSuccess());
    }
  } catch (err) {
    yield put(updateUserError(err.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(CREATE_USER_START, onCreateUserStartAsync);
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

function* onUpdateUser() {
  yield takeLatest(UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
