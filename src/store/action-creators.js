import {
  CREATE_USER_ERROR,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  FILTER_USER_ERROR,
  FILTER_USER_START,
  FILTER_USER_SUCCESS,
  LOAD_USERS_ERROR,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
  SEARCH_USER_ERROR,
  SEARCH_USER_START,
  SEARCH_USER_SUCCESS,
  SORT_USER_ERROR,
  SORT_USER_START,
  SORT_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
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

export const deleteUserStart = (userId) => ({
  type: DELETE_USER_START,
  payload: userId,
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});

export const deleteUserError = (err) => ({
  type: DELETE_USER_ERROR,
  payload: err,
});

export const updateUserStart = (userInfo) => ({
  type: UPDATE_USER_START,
  payload: userInfo,
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const updateUserError = (err) => ({
  type: UPDATE_USER_ERROR,
  payload: err,
});

export const searchUserStart = (query) => ({
  type: SEARCH_USER_START,
  payload: query,
});

export const searchUserSuccess = (users) => ({
  type: SEARCH_USER_SUCCESS,
  payload: users,
});

export const searchUserError = (err) => ({
  type: SEARCH_USER_ERROR,
  payload: err,
});

export const filterUserStart = (query) => ({
  type: FILTER_USER_START,
  payload: query,
});

export const filterUserSuccess = (users) => ({
  type: FILTER_USER_SUCCESS,
  payload: users,
});

export const filterUserError = (err) => ({
  type: FILTER_USER_ERROR,
  payload: err,
});

export const sortUserStart = (query) => ({
  type: SORT_USER_START,
  payload: query,
});

export const sortUserSuccess = (users) => ({
  type: SORT_USER_SUCCESS,
  payload: users,
});

export const sortUserError = (err) => ({
  type: SORT_USER_ERROR,
  payload: err,
});
