import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './jwt'
export default combineReducers({
    routing: routerReducer,
    token
});