import actionType from './actionTypes'
import {axiosRequest} from '../util/api'
import ROUTES from '../util/routes'
import {toastr} from 'react-redux-toastr'
import {push} from 'connected-react-router'
import language from '../constants/error-msg-definitions'

import {
    getDefaultConfigData
} from "./defaultConfigAction";

const getRestaurantFormRequest = () => ({type: actionType.GET_RESTAURANT_FORM_REQUEST})
const getRestaurantFormSuccess = (payload) => ({type: actionType.GET_RESTAURANT_FORM_SUCCESS, payload})
const getRestaurantFormError = () => ({type: actionType.GET_RESTAURANT_FORM_ERROR})

const postRestaurantFormRequest = () => ({type: actionType.POST_RESTAURANT_FORM_REQUEST})
const postRestaurantFormSuccess = (payload) => ({type: actionType.POST_RESTAURANT_FORM_SUCCESS, payload})
const postRestaurantFormError = () => ({type: actionType.POST_RESTAURANT_FORM_ERROR})
const GET_RESTAURANT_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/restaurant/';
const UPDATE_RESTAURANT_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/restaurant/';
const ADDRESS_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/address/';

export const getRestaurantFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(getRestaurantFormRequest())
        let URL = GET_RESTAURANT_URL + payload.restaurantId;

        if (URL) {
            const state = getState()
            const headers = {Authorization: `bearer ${state.auth.token}`}
            let params = {}
            axiosRequest.get(URL, {headers, params})
                .then(response => {
                    console.log(response)
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
        console.log(payload)
        dispatch(postRestaurantFormRequest())
        let URL = UPDATE_RESTAURANT_URL + payload.restaurantId
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
                        dispatch(postRestaurantFormSuccess(data))

                        dispatch(getRestaurantFormData({restaurantId: localStorage.getItem('restaurantId')}))
                        dispatch(getDefaultConfigData({restaurantId: localStorage.getItem('restaurantId')}))
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

export const getCantonesFromAPI = async (data) => {

    const cantones = await axiosRequest.get(`${ADDRESS_URL}cantones/${data.value}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).catch((error) => {
        toastr.error('Error', 'No se ha podido optener los cantones')
    })


    return cantones.data

}

export const getDistritosFromAPI = async (provincia, canton) => {

    const distritos = await axiosRequest.get(`${ADDRESS_URL}distritos/${provincia}/${canton}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).catch((error) => {
        toastr.error('Error', 'No se ha podido optener los cantones')
    })


    return distritos.data

}