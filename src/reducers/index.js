import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import auth from './authReducer';
import form from './formReducer';
import deliveryMethod from './deliveryMethodReducer';
import paymentMethod from './paymentMethodReducer';
import restaurant from './restaurantReducer';
import menuReducer from "./menuReducer";
import controlCenter from './controlCenterMethodReducer';
import defaultConfigReducer from "./defaultConfigReducer";

export default combineReducers({
    auth, toastr: toastrReducer, form, delivery: deliveryMethod, restaurant, menuReducer, controlCenter, payment:paymentMethod, defaultConfig: defaultConfigReducer
})
