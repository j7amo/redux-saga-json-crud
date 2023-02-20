import {
  LOAD_USERS_ERROR,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
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
    case LOAD_USERS_ERROR:
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
