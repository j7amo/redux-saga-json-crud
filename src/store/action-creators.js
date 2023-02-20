import {
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
