import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const getCategoryListRequest = () => ({ type: actionType.GET_CATEGORY_LIST_REQUEST })
const getCategoryListSuccess = (payload) => ({ type: actionType.GET_CATEGORY_LIST_SUCCESS, payload })
const getCategoryListError = () => ({ type: actionType.GET_CATEGORY_LIST_ERROR })

const postCategoryFormRequest = () => ({ type: actionType.POST_CATEGORY_FORM_REQUEST })
const postCategoryFormSuccess = (payload) => ({ type: actionType.POST_CATEGORY_FORM_SUCCESS, payload })
const postCategoryFormError = () => ({ type: actionType.POST_CATEGORY_FORM_ERROR })

const getMenuListRequest = () => ({ type: actionType.GET_MENU_LIST_REQUEST })
const getMenuListSuccess = (payload) => ({ type: actionType.GET_MENU_LIST_SUCCESS, payload })
const getMenuListError = () => ({ type: actionType.GET_MENU_LIST_ERROR })

const postMenuFormRequest = () => ({ type: actionType.POST_MENU_FORM_REQUEST })
const postMenuFormSuccess = (payload) => ({ type: actionType.POST_MENU_FORM_SUCCESS, payload })
const postMenuFormError = () => ({ type: actionType.POST_MENU_FORM_ERROR })

const restaurantId = localStorage.getItem('restaurantId');

const GET_CATEGORY_LIST_URL = '/api/menu/categories/' + restaurantId;
const UPDATE_CATEGORY_URL = '/api/menu/categories/' + restaurantId;

const GET_MENU_LIST_URL = 'api/menu/item/';
const UPDATE_MENU_URL = '/api/menu/item/';

export const getCategoryListData = () => {
    return (dispatch, getState) => {
        dispatch(getCategoryListRequest())
        let URL = GET_CATEGORY_LIST_URL

        if (URL) {
            const state = getState()
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let params = {}
            axiosRequest.get(URL, { headers, params })
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
        let URL = GET_MENU_LIST_URL+id

        if (URL) {
            const state = getState()
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let params = {}
            axiosRequest.get(URL, { headers, params })
                .then(response => {
                    // console.log(response)
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


export const updateCategoryFormData = (payload, callback) => {
    return (dispatch, getState) => {
        dispatch(postCategoryFormRequest())
        let URL = UPDATE_CATEGORY_URL
        if (URL) {
            const state = getState()
            const lang = 'en'
            const headers = { Authorization: `bearer ${state.auth.token}` }
            // console.log(JSON.stringify(payload))
            axiosRequest.put(URL, {categories: JSON.stringify(payload)}, { headers })
                .then(response => {
                    const data = response.data
                    // console.log(response)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postCategoryFormSuccess(data))
                        dispatch(push(ROUTES.MODIFY_MENU))
                        if (callback)
                            callback();
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, response.message)
                        dispatch(postCategoryFormError())
                    }
                })
                .catch(error => {
                    // console.log(error)
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
    return (dispatch, getState) => {
        dispatch(postMenuFormRequest())
        let URL = UPDATE_MENU_URL + categoryId
        if (URL) {
            const state = getState()
            const lang = 'en'
            const headers = { Authorization: `bearer ${state.auth.token}` }
            const data = {restaurantId: restaurantId, products: JSON.stringify(payload)}
            axiosRequest.post(URL, data, { headers })
                .then(response => {
                    const data = response.data
                    // console.log(response)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postMenuFormSuccess(data))
                        dispatch(push(ROUTES.MODIFY_MENU))
                        getMenuListData(payload.categoryId);
                        if(callback)
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

