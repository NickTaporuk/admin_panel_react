import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import user from './user';
import sidebar from './sidebar';
import spinner from './spinner';

export default combineReducers({
    user,
    sidebar,
    spinner,
    form : formReducer
});