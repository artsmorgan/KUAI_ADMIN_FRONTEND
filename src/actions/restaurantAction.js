import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const getRestaurantFormRequest = () => ({ type: actionType.GET_RESTAURANT_FORM_REQUEST })
const getRestaurantFormSuccess = (payload) => ({ type: actionType.GET_RESTAURANT_FORM_SUCCESS, payload })
const getRestaurantFormError = () => ({ type: actionType.GET_RESTAURANT_FORM_ERROR })

const postRestaurantFormRequest = () => ({ type: actionType.POST_RESTAURANT_FORM_REQUEST })
const postRestaurantFormSuccess = (payload) => ({ type: actionType.POST_RESTAURANT_FORM_SUCCESS, payload })
const postRestaurantFormError = () => ({ type: actionType.POST_RESTAURANT_FORM_ERROR })
const GET_RESTAURANT_URL = '/api/restaurant/';
const UPDATE_RESTAURANT_URL = '/api/restaurant/05c546a8-ba70-4d0e-be64-17f5f785eae7';

export const getRestaurantFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(getRestaurantFormRequest())
        let URL = GET_RESTAURANT_URL+payload.restaurantId;

        if (URL) {
            const state = getState()
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let params = {}
            axiosRequest.get(URL, { headers, params })
                .then(response => {
                    // console.log(response)
                    dispatch(getRestaurantFormSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(response)
                    dispatch(getRestaurantFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getRestaurantFormError())
        }
    }

}


export const updateRestaurantFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(postRestaurantFormRequest())
        let URL = UPDATE_RESTAURANT_URL
        if (URL) {
            const state = getState()
            const lang = 'en'
            let formData = new URLSearchParams()
            Object.keys(payload).forEach(field => {
                formData.set(field, payload[field])
            })

            const headers = { Authorization: `bearer ${state.auth.token}` }
            axiosRequest.post(URL, formData, { headers })
                .then(response => {
                    const data = response.data
                    console.log(data)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postRestaurantFormSuccess(data))
                        // dispatch(push(nextForm))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, response.message)
                        dispatch(postRestaurantFormError())
                    }
                })
                .catch(error => {
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postRestaurantFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postRestaurantFormError())
        }
    }

}

