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

const initialState = {
  users: [],
  loading: false,
  error: null,
  pageLimit: 4,
  currentPage: 0,
  paginationMode: true,
};

// eslint-disable-next-line default-param-last
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_START:
    case CREATE_USER_START:
    case DELETE_USER_START:
    case UPDATE_USER_START:
    case SEARCH_USER_START:
    case FILTER_USER_START:
    case SORT_USER_START:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        loading: false,
        currentPage:
          action.payload.currentPageIncrement !== 0
            ? state.currentPage + action.payload.currentPageIncrement
            : 0,
        paginationMode: true,
      };
    case SEARCH_USER_SUCCESS:
    case FILTER_USER_SUCCESS:
    case SORT_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        paginationMode: false,
      };
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPage: 0,
      };
    case CREATE_USER_ERROR:
    case LOAD_USERS_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
    case SEARCH_USER_ERROR:
    case FILTER_USER_ERROR:
    case SORT_USER_ERROR:
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
