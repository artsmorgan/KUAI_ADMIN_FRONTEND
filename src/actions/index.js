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
    getCantonesFromAPI,
    getDistritosFromAPI
} from './restaurantAction'

import {
    getDeliveryMethodFormData,
    updateDeliveryMethodFormData,
} from './deliveryMethodAction'

import {
    getPaymentMethodFormData,
    updatePaymentMethodFormData,
} from './paymentMethodAction'

import {
    getCategoryListData,
    updateCategoryFormData,
    getMenuListData,
    postMenuFormData
} from './menuAction'
import {
    getControlCenterMethodFormData,
} from './controlCenterMethodAction'

import {
    getDefaultConfigData,
} from './defaultConfigAction'

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
    getCantonesFromAPI,
    getDistritosFromAPI,

    getDeliveryMethodFormData,
    updateDeliveryMethodFormData,

    getPaymentMethodFormData,
    updatePaymentMethodFormData,

    getCategoryListData,
    updateCategoryFormData,
    getMenuListData,
    postMenuFormData,

    getControlCenterMethodFormData,

    getDefaultConfigData
}