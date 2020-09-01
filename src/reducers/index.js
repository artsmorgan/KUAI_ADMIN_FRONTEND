import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import auth from './authReducer';
import form from './formReducer';

export default combineReducers({
    auth, toastr: toastrReducer, form
})
