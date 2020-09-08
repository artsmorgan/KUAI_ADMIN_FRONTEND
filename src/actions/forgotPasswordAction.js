import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const postForgotPassFormRequest = () => ({ type: actionType.POST_FORGOT_PASS_FORM_REQUEST })
const postForgotPassFormSuccess = (payload) => ({ type: actionType.POST_FORGOT_PASS_FORM_SUCCESS, payload })
const postForgotPassFormError = () => ({ type: actionType.POST_FORGOT_PASS_FORM_ERROR })

const UPDATE_FORGOT_PASS_URL = '/api/forgotpassword/request'

export const postForgotPassFormData = (payload) => {
    // console.log(payload)
    return (dispatch, getState) => {
        dispatch(postForgotPassFormRequest())
        let URL = UPDATE_FORGOT_PASS_URL
        if (URL) {
            const state = getState()
            const lang = 'en'
            const headers = { Authorization: `bearer ${state.auth.token}` }
            axiosRequest.post(URL, {email: payload.email}, { headers })
                .then(response => {
                    const data = response.data
                    console.log(response)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : "Hemos enviado un e-mail con las instrucciones para resetear tu password")
                        dispatch(postForgotPassFormSuccess(data))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, "No record found with this email")
                        dispatch(postForgotPassFormError())
                    }
                })
                .catch(error => {
                    console.log(error)
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postForgotPassFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postForgotPassFormError())
        }
    }

}

