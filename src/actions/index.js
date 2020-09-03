import {redirectToUrl} from './miscAction'
import {
    postLoginForm,
    redirectToLogin,
    isLoggedInAndRedirect,
    checkStorageLoginCred,
    logout
} from './authAction'
import {
    getFormData,
    postFormData,
} from './formAction'

import {
    getRestaurantFormData,
    updateRestaurantFormData,
} from './restaurantAction'

import {
    getDeliveryMethodFormData,
    updateDeliveryMethodFormData,
} from './deliveryMethodAction'

import {
    getControlCenterMethodFormData,
} from './controlCenterMethodAction'

export {
    redirectToUrl,
    postLoginForm,
    isLoggedInAndRedirect,
    redirectToLogin,
    checkStorageLoginCred,
    logout,

    getFormData,
    postFormData,
    
    getRestaurantFormData,
    updateRestaurantFormData,

    getDeliveryMethodFormData,
    updateDeliveryMethodFormData,

    getControlCenterMethodFormData
}