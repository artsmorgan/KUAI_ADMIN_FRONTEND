import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const postLoginRequest = () => ({ type: actionType.LOGIN_POST_REQUEST })
const postLoginSuccess = (payload) => ({ type: actionType.LOGIN_POST_SUCCESS, payload })
const postLoginError = () => ({ type: actionType.LOGIN_POST_ERROR })
const setLoginCred = (payload) => ({ type: actionType.SET_LOGIN_CRED, payload })
const flushLoginCred = () => ({ type: actionType.FLUSH_LOGIN_CRED })
const LOGIN_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/login'

export const postLoginForm = (payload) => {
    return (dispatch, getState) => {
        dispatch(postLoginRequest())
        const state = getState()
        const lang = 'en'
        let formData = new URLSearchParams()
        Object.keys(payload).forEach(field => {
            formData.set(field, payload[field])
        })

        axiosRequest.post(LOGIN_URL, formData)
            .then(response => {
                const data = response.data
                // console.log(response)
                if (data.success) {
                    toastr.success(language[lang].success, language[lang].success)
                    dispatch(postLoginSuccess(data))
                    dispatch(push(ROUTES.ORDERS))
                } else {
                    toastr.error("Error", "Usuario o contraseña inválida.")
                    dispatch(postLoginError())
                }
            })
            .catch(error => {
                // console.log(error.response)
                toastr.error(language[lang].error, error.response !== undefined ? error.response.data.message : "Something went wrong")
                dispatch(postLoginError())
            })
    }

}

export const isLoggedInAndRedirect = () => {
    return (dispatch, getState) => {
        const { auth } = getState()
        console.log("order redirect")
        if (auth.accessToken && auth.tokenExpiredAt && auth.tokenExpiredAt > new Date()) {
            console.log("order redirect")
            dispatch(push(ROUTES.ORDERS))
        }
    }
}

export const checkStorageLoginCred = () => {
    console.log("i see checkStorageLoginCred req")
    return (dispatch, getState) => {
        const state = getState()
        const accessToken = localStorage.getItem('accessToken')
        const tokenExpiredAt = localStorage.getItem('tokenExpiredAt')
        const refreshToken = localStorage.getItem('refreshToken')
        const token = localStorage.getItem('token')
        const restaurantId = localStorage.getItem('restaurantId')
        const loading = false
        if (token && accessToken && refreshToken && restaurantId && tokenExpiredAt && tokenExpiredAt > new Date()) {
            // console.log("going to setLoginCred")
            dispatch(setLoginCred({ accessToken, refreshToken, tokenExpiredAt, token, restaurantId, loading }))
            setTimeout(() => {
                dispatch(push(state.router.location.pathname))
            }, 100)
        } else {
            console.log("logout")
            // logout()
            dispatch(push(ROUTES.LOGIN))
        }
    }
}

export const redirectToLogin = () => {
    return (dispatch) => {
        dispatch(push(ROUTES.LOGIN))
    }

}

export const logout = () => dispatch => {
    // console.log("logout req")
    localStorage.removeItem('accessToken')
    localStorage.removeItem('tokenExpiredAt')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('token')
    localStorage.removeItem('restaurantId')
    toastr.warning('', 'Se ha cerrado la sesión')
    dispatch(flushLoginCred())
    dispatch(redirectToLogin())
}
