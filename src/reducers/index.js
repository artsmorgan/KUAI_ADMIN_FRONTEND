import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'

import auth from './authReducer';
import form from './formReducer';

/*export default combineReducers({
    router: connectRouter(history),
    auth, form
})*/

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth, form
})
export default createRootReducer
