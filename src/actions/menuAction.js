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

const restaurantId = localStorage.getItem('restaurantId');

const GET_CATEGORY_LIST_URL = '/api/menu/categories/' + restaurantId;
const UPDATE_CATEGORY_URL = '/api/menu/categories/' + restaurantId;

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
                    console.log(response)
                    dispatch(getCategoryListSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    console.log(error)
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


export const updateCategoryFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(postCategoryFormRequest())
        let URL = UPDATE_CATEGORY_URL
        if (URL) {
            const state = getState()
            const lang = 'en'
            let formData = new URLSearchParams()
            Object.keys(payload).forEach(field => {
                formData.set(field, payload[field])
            })

            const headers = { Authorization: `bearer ${state.auth.token}` }
            axiosRequest.put(URL, formData, { headers })
                .then(response => {
                    const data = response.data
                    console.log(data)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postCategoryFormSuccess(data))
                        dispatch(push(ROUTES.MODIFY_MENU))
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

