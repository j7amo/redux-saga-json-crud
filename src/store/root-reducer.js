import { combineReducers } from 'redux';
import usersReducer from './reducer';

const reducer = combineReducers({
  data: usersReducer,
});

export default reducer;
