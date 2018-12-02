import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import searchReducer from './searchReducer';
import mySearchesReducer from './mySearchesReducer';

// combinam reducerii
export default combineReducers({
    search: mySearchesReducer,
    results: searchReducer,
    auth: authReducer,
    errors: errorReducer
});