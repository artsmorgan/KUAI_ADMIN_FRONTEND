import actionType from './actionTypes'
import {axiosRequest} from '../util/api'
import ROUTES from '../util/routes'
import {toastr} from 'react-redux-toastr'
import {push} from 'connected-react-router'
import {logout} from './authAction'
import language from '../constants/error-msg-definitions'

const getFormRequest = () => ({type: actionType.GET_FORM_REQUEST})
const getFormSuccess = (payload) => ({type: actionType.GET_FORM_SUCCESS, payload})
const getFormError = () => ({type: actionType.GET_FORM_ERROR})
const postFormRequest = () => ({type: actionType.POST_FORM_REQUEST})
const postFormSuccess = (payload) => ({type: actionType.POST_FORM_SUCCESS, payload})
const postFormError = () => ({type: actionType.POST_FORM_ERROR})

const restaurantId = localStorage.getItem('restaurantId');

const REGISTER_URL = '/api/createUser'
const ORDERS_URL = '/api/orders'
const PAYMENT_METHODS_URL = 'api/paymentMethods/' + restaurantId;

export const getFormData = (payload) => {
    // console.log(payload.step);
    return (dispatch, getState) => {
        dispatch(getFormRequest())
        let URL = null
        switch (payload.step) {
            case 'ORDERS':
                URL = ORDERS_URL
                break
            case 'PAYMENT_METHODS':
                URL = PAYMENT_METHODS_URL
                break
            default:
                break
        }
        if (URL) {
            const state = getState()
            const headers = {Authorization: `bearer ${state.auth.token}`}
            let params = {}
            axiosRequest.get(URL, {headers, params})
                .then(response => {
                    // console.log(response)
                    dispatch(getFormSuccess({
                        data: response.data,
                        step: payload.step
                    }))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(response)
                    dispatch(getFormError())
                    if (response && response.status === 401) {
                        logout(dispatch)
                    }
                })
        } else {
            dispatch(getFormError())
        }
    }

}

export const postFormData = (payload) => {
    return (dispatch, getState) => {
        // console.log(payload.form)
        dispatch(postFormRequest())
        let URL = null
        let nextForm = null
        switch (payload.step) {
            case 'REGISTER':
                URL = REGISTER_URL
                nextForm = ROUTES.LOGIN
                break
            default:
                break
        }
        if (URL && nextForm) {
            const state = getState()
            let formData = ['', ''].includes(payload.step) ? new FormData() : new URLSearchParams()
            let lang = 'en'
            Object.keys(payload.form).forEach(field => {
                if (['', ''].includes(payload.step)) {
                    formData.append('files', payload.form[0])
                } else {
                    formData.set(field, payload.form[field])
                }
            })

            const headers = {Authorization: `bearer ${state.auth.token}`}
            axiosRequest.post(URL, formData, {headers})
                .then(response => {
                    const data = response.data
                    console.log(data)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postFormSuccess(data))
                        dispatch(push(nextForm))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, data.error.message)
                        dispatch(postFormError())
                    }
                })
                .catch(error => {
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postFormError())
                    if (response && response.status === 401) {
                        logout(dispatch)
                    }
                })
        } else {
            dispatch(postFormError())
        }
    }

}