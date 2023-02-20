import {
  CREATE_USER_ERROR,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  LOAD_USERS_ERROR,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
} from './action-types';

export const loadUsersStart = () => ({
  type: LOAD_USERS_START,
});

export const loadUsersSuccess = (users) => ({
  type: LOAD_USERS_SUCCESS,
  payload: users,
});

export const loadUsersError = (err) => ({
  type: LOAD_USERS_ERROR,
  payload: err,
});

export const createUserStart = (user) => ({
  type: CREATE_USER_START,
  payload: user,
});

export const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS,
});

export const createUserError = (err) => ({
  type: CREATE_USER_ERROR,
  payload: err,
});
