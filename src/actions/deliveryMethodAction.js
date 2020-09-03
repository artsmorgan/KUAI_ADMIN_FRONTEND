import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const getDeliveryMethodFormRequest = () => ({ type: actionType.GET_DELIVERY_METHOD_FORM_REQUEST })
const getDeliveryMethodFormSuccess = (payload) => ({ type: actionType.GET_DELIVERY_METHOD_FORM_SUCCESS, payload })
const getDeliveryMethodFormError = () => ({ type: actionType.GET_DELIVERY_METHOD_FORM_ERROR })

const postDeliveryMethodFormRequest = () => ({ type: actionType.POST_DELIVERY_METHOD_FORM_REQUEST })
const postDeliveryMethodFormSuccess = (payload) => ({ type: actionType.POST_DELIVERY_METHOD_FORM_SUCCESS, payload })
const postDeliveryMethodFormError = () => ({ type: actionType.POST_DELIVERY_METHOD_FORM_ERROR })
const GET_DELIVERY_METHOD_URL = '/api/deliveryMethods/';
const UPDATE_DELIVERY_METHOD_URL = '/api/deliveryMethods/';

export const getDeliveryMethodFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(getDeliveryMethodFormRequest())
        let URL = GET_DELIVERY_METHOD_URL + payload.restaurantId;

        if (URL) {
            const state = getState()
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let params = {}
            axiosRequest.get(URL, { headers, params })
                .then(response => {
                    // console.log(response)
                    dispatch(getDeliveryMethodFormSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(response)
                    dispatch(getDeliveryMethodFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getDeliveryMethodFormError())
        }
    }

}


export const updateDeliveryMethodFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(postDeliveryMethodFormRequest())
        
        let URL = UPDATE_DELIVERY_METHOD_URL+payload.restaurantId
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
                    console.log(data)
                    if (response.status===200) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postDeliveryMethodFormSuccess(data))
                        dispatch(getDeliveryMethodFormData({ restaurantId: localStorage.getItem('restaurantId') }))
                        // dispatch(push(nextForm))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, response.message)
                        dispatch(postDeliveryMethodFormError())
                    }
                })
                .catch(error => {
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postDeliveryMethodFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postDeliveryMethodFormError())
        }
    }

}

