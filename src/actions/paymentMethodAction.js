import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const getPaymentMethodFormRequest = () => ({ type: actionType.GET_PAYMENT_METHOD_FORM_REQUEST })
const getPaymentMethodFormSuccess = (payload) => ({ type: actionType.GET_PAYMENT_METHOD_FORM_SUCCESS, payload })
const getPaymentMethodFormError = () => ({ type: actionType.GET_PAYMENT_METHOD_FORM_ERROR })

const postPaymentMethodFormRequest = () => ({ type: actionType.POST_PAYMENT_METHOD_FORM_REQUEST })
const postPaymentMethodFormSuccess = (payload) => ({ type: actionType.POST_PAYMENT_METHOD_FORM_SUCCESS, payload })
const postPaymentMethodFormError = () => ({ type: actionType.POST_PAYMENT_METHOD_FORM_ERROR })
const GET_PAYMENT_METHOD_URL = '/api/paymentMethods/';
const UPDATE_PAYMENT_METHOD_URL = '/api/paymentMethods/';

export const getPaymentMethodFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(getPaymentMethodFormRequest())
        let URL = GET_PAYMENT_METHOD_URL + payload.restaurantId;

        if (URL) {
            const state = getState()
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let params = {}
            axiosRequest.get(URL, { headers, params })
                .then(response => {
                    // console.log(response)
                    dispatch(getPaymentMethodFormSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(response)
                    dispatch(getPaymentMethodFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getPaymentMethodFormError())
        }
    }

}


export const updatePaymentMethodFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(postPaymentMethodFormRequest())
        
        let URL = UPDATE_PAYMENT_METHOD_URL+payload.restaurantId
        if (URL) {
            const state = getState()
            const lang = 'en'
            let formData = new URLSearchParams();
            let form = payload.form;
            Object.keys(form).forEach(field => {
                formData.set(field, form[field])
            })

            const headers = { Authorization: `bearer ${state.auth.token}` }
            axiosRequest.put(URL, formData, { headers })
                .then(response => {
                    const data = response.data
                    // console.log(data)
                    if (response.status===200) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postPaymentMethodFormSuccess(data))
                        dispatch(getPaymentMethodFormData({ restaurantId: localStorage.getItem('restaurantId') }))
                        // dispatch(push(nextForm))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, response.message)
                        dispatch(postPaymentMethodFormError())
                    }
                })
                .catch(error => {
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postPaymentMethodFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postPaymentMethodFormError())
        }
    }

}

