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
    cleanRegisterData
} from './formAction'

import {
    getOrderFormData,
    updateOrderFormData,
} from './orderAction'

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
    postMenuFormData,
    getMenuListByCategoryData,
    postRemovalMenuFormData
} from './menuAction'
import {
    getControlCenterMethodFormData,
} from './controlCenterMethodAction'

import {
    getDefaultConfigData,
} from './defaultConfigAction'

import {
    postForgotPassFormData,
} from './forgotPasswordAction'

import {
    postCHANGEPassFormData,
} from './changePasswordAction'

import {
    postTechSupportFormData,
} from './techSupportAction'

export {
    redirectToUrl,
    postLoginForm,
    isLoggedInAndRedirect,
    redirectToLogin,
    checkStorageLoginCred,
    logout,

    getFormData,
    postFormData,
    cleanRegisterData,
    
    getOrderFormData,
    updateOrderFormData,

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

    getDefaultConfigData,

    postForgotPassFormData,

    postTechSupportFormData,

    getMenuListByCategoryData,
    postRemovalMenuFormData,

    postCHANGEPassFormData
}