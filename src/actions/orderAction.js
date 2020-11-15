import actionType from './actionTypes'
import {axiosRequest} from '../util/api'
import ROUTES from '../util/routes'
import {toastr} from 'react-redux-toastr'
import {push} from 'connected-react-router'
import language from '../constants/error-msg-definitions'

import {
    getDefaultConfigData
} from "./defaultConfigAction";

const getOrderFormRequest = () => ({type: actionType.GET_ORDER_FORM_REQUEST})
const getOrderFormSuccess = (payload) => ({type: actionType.GET_ORDER_FORM_SUCCESS, payload})
const getOrderFormError = () => ({type: actionType.GET_ORDER_FORM_ERROR})

const postOrderFormRequest = () => ({type: actionType.POST_ORDER_FORM_REQUEST})
const postOrderFormSuccess = (payload) => ({type: actionType.POST_ORDER_FORM_SUCCESS, payload})
const postOrderFormError = () => ({type: actionType.POST_ORDER_FORM_ERROR})
const GET_ORDER_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/order/';
const UPDATE_ORDER_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/order/';

export const getOrderFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(getOrderFormRequest())
        let URL = GET_ORDER_URL + payload.restaurantId;
        // let URL = GET_ORDER_URL + 'b7bf6410-1bb8-4395-a0ad-918d5d48d522';

        if (URL) {
            const state = getState()
            const headers = {Authorization: `bearer ${state.auth.token}`}
            let params = {}
            axiosRequest.get(URL, {headers, params})
                .then(response => {
                    // console.log(response)
                    dispatch(getOrderFormSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(response)
                    dispatch(getOrderFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getOrderFormError())
        }
    }

}


export const updateOrderFormData = (payload) => {
    return (dispatch, getState) => {
        console.log(payload)
        dispatch(postOrderFormRequest())
        let URL = UPDATE_ORDER_URL + payload.restaurantId
        if (URL) {
            const state = getState()
            const lang = 'en'
            let formData = new URLSearchParams()
            let dataToPost = payload.form;
            Object.keys(dataToPost).forEach(field => {
                formData.set(field, dataToPost[field])
            })

            const headers = {Authorization: `bearer ${state.auth.token}`}
            axiosRequest.put(URL, formData, {headers})
                .then(response => {
                    const data = response.data
                    console.log(response)
                    if (response.status === 200) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postOrderFormSuccess(data))

                        dispatch(getOrderFormData({restaurantId: localStorage.getItem('restaurantId')}))
                        dispatch(getDefaultConfigData({restaurantId: localStorage.getItem('restaurantId')}))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, response.message)
                        dispatch(postOrderFormError())
                    }
                })
                .catch(error => {
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postOrderFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postOrderFormError())
        }
    }

}
