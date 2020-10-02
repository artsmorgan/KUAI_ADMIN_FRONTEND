import actionType from './actionTypes'
import {axiosRequest} from '../util/api'
import ROUTES from '../util/routes'
import {toastr} from 'react-redux-toastr'
import {push} from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const getCategoryListRequest = () => ({type: actionType.GET_CATEGORY_LIST_REQUEST})
const getCategoryListSuccess = (payload) => ({type: actionType.GET_CATEGORY_LIST_SUCCESS, payload})
const getCategoryListError = () => ({type: actionType.GET_CATEGORY_LIST_ERROR})

const postCategoryFormRequest = () => ({type: actionType.POST_CATEGORY_FORM_REQUEST})
const postCategoryFormSuccess = (payload) => ({type: actionType.POST_CATEGORY_FORM_SUCCESS, payload})
const postCategoryFormError = () => ({type: actionType.POST_CATEGORY_FORM_ERROR})

const getMenuListRequest = () => ({type: actionType.GET_MENU_LIST_REQUEST})
const getMenuListSuccess = (payload) => ({type: actionType.GET_MENU_LIST_SUCCESS, payload})
const getMenuListError = () => ({type: actionType.GET_MENU_LIST_ERROR})

const postMenuFormRequest = () => ({type: actionType.POST_MENU_FORM_REQUEST})
const postMenuFormSuccess = (payload) => ({type: actionType.POST_MENU_FORM_SUCCESS, payload})
const postMenuFormError = () => ({type: actionType.POST_MENU_FORM_ERROR})

const getMenuListFullRequest = () => ({ type: actionType.GET_MENU_LIST_FULL_REQUEST })
const getMenuListFullSuccess = (payload) => ({ type: actionType.GET_MENU_LIST_FULL_SUCCESS, payload })
const getMenuListFullError = () => ({ type: actionType.GET_MENU_LIST_FULL_ERROR })

const restaurantId = localStorage.getItem('restaurantId');

const GET_CATEGORY_LIST_URL = '/api/menu/categories/'
const UPDATE_CATEGORY_URL = '/api/menu/categories/'

const GET_MENU_LIST_URL = 'api/menu/item/';
const UPDATE_MENU_URL = '/api/menu/item/';
const GET_MENU_LIST_BY_CATEGORY_URL = '/api/menu/categoriesandproducts/';

export const getCategoryListData = (payload) => {
    console.log("I see", payload)
    return (dispatch, getState) => {
        dispatch(getCategoryListRequest())
        let URL = GET_CATEGORY_LIST_URL + payload.restaurantId;

        if (URL) {
            const state = getState()
            const headers = {Authorization: `bearer ${state.auth.token}`}
            let params = {}
            axiosRequest.get(URL, {headers, params})
                .then(response => {
                    // console.log(response)
                    dispatch(getCategoryListSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(error)
                    dispatch(getCategoryListError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getCategoryListError())
        }
    }
}



export const getMenuListData = (id) => {
    return (dispatch, getState) => {
        dispatch(getMenuListRequest())
        let URL = GET_MENU_LIST_URL + id

        if (URL) {
            const state = getState()
            const headers = {Authorization: `bearer ${state.auth.token}`}
            let params = {}
            axiosRequest.get(URL, {headers, params})
                .then(response => {
                    console.log('GET_MENU_LIST_URL',response)
                    dispatch(getMenuListSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(error)
                    dispatch(getMenuListError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getMenuListError())
        }
    }

}

export const getMenuListByCategoryData = (payload) => {
    return (dispatch, getState) => {
        dispatch(getMenuListFullRequest())
        let URL = GET_MENU_LIST_BY_CATEGORY_URL + payload.restaurantId
        console.log('url',URL)
        if (URL) {
            const state = getState()
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let params = {}
            axiosRequest.get(URL, { headers, params })
                .then(response => {
                    console.log(response)
                    dispatch(getMenuListFullSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(error)
                    dispatch(getMenuListFullError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getMenuListFullError())
        }
    }

}


export const updateCategoryFormData = (payload, callback) => {
    return (dispatch, getState) => {
        dispatch(postCategoryFormRequest())
        console.log("payload", payload)
        let URL = UPDATE_CATEGORY_URL + payload.restaurantId
        if (URL) {
            const state = getState()
            const lang = 'en'
            const headers = {Authorization: `bearer ${state.auth.token}`}
            // console.log(JSON.stringify(payload))
            axiosRequest.put(URL, {categories: JSON.stringify(payload.catList)}, {headers})
                .then(response => {
                    const data = response.data
                    console.log(response)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postCategoryFormSuccess(data))
                        dispatch(push(ROUTES.MODIFY_MENU))
                        if (callback) {
                            console.log("callback req to get menu list")
                            callback();
                        }
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, response.message)
                        dispatch(postCategoryFormError())
                    }
                })
                .catch(error => {
                    console.log(error)
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postCategoryFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postCategoryFormError())
        }
    }

}

export const postMenuFormData = (payload, categoryId, callback) => {
    console.log('payload', payload)
    return (dispatch, getState) => {
        dispatch(postMenuFormRequest())
        let URL = UPDATE_MENU_URL + categoryId
        if (URL) {
            const state = getState()
            const lang = 'en'
            const headers = {Authorization: `bearer ${state.auth.token}`}
            const data = {restaurantId: restaurantId, products: JSON.stringify(payload)}
            axiosRequest.post(URL, data, {headers})
                .then(response => {
                    const data = response.data
                    // console.log(response)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postMenuFormSuccess(data))
                        dispatch(push(ROUTES.MODIFY_MENU))
                        getMenuListData(payload.categoryId);
                        if (callback)
                            callback();
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, response.message)
                        dispatch(postMenuFormError())
                    }
                })
                .catch(error => {
                    // console.log(error)
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postMenuFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postMenuFormError())
        }
    }

}

