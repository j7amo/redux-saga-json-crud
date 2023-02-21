import {
  CREATE_USER_ERROR,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  LOAD_USERS_ERROR,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
} from './action-types';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// eslint-disable-next-line default-param-last
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_START:
    case CREATE_USER_START:
    case DELETE_USER_START:
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_SUCCESS: {
      const updatedUsers = state.users.filter(
        (user) => user.id !== action.payload,
      );

      return {
        ...state,
        users: updatedUsers,
        loading: false,
      };
    }
    case CREATE_USER_ERROR:
    case LOAD_USERS_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
