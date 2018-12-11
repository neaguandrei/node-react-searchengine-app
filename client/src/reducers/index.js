import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import searchReducer from './searchReducer';
import mySearchesReducer from './mySearchesReducer';
import preferencesReducer from './preferencesReducer';
import commentReducer from './commentReducer';

// combinam reducerii
export default combineReducers({
    preferences: preferencesReducer,
    searches: mySearchesReducer,
    results: searchReducer,
    auth: authReducer,
    errors: errorReducer,
    comments: commentReducer
});