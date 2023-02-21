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
  FILTER_USER_START,
  LOAD_USERS_START,
  SEARCH_USER_START,
  UPDATE_USER_START,
} from './action-types';
import {
  createUserApi,
  deleteUserApi,
  filterUsersApi,
  loadUsersApi,
  searchUsersApi,
  updateUserApi,
} from './api';
import {
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  filterUserError,
  filterUserSuccess,
  loadUsersError,
  loadUsersSuccess,
  searchUserError,
  searchUserSuccess,
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

function* onSearchUserStartAsync({ payload }) {
  try {
    const response = yield call(searchUsersApi, payload);

    if (response.status === 200) {
      yield delay(500);
      yield put(searchUserSuccess(response.data));
    }
  } catch (err) {
    yield put(searchUserError(err.response.data));
  }
}

function* onFilterUserStartAsync({ payload }) {
  try {
    const response = yield call(filterUsersApi, payload);

    if (response.status === 200) {
      yield delay(500);
      yield put(filterUserSuccess(response.data));
    }
  } catch (err) {
    yield put(filterUserError(err.response.data));
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

function* onSearchUser() {
  yield takeLatest(SEARCH_USER_START, onSearchUserStartAsync);
}

function* onFilterUser() {
  yield takeLatest(FILTER_USER_START, onFilterUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
  fork(onSearchUser),
  fork(onFilterUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
