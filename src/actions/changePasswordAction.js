import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import { toastr } from 'react-redux-toastr'
import language from '../constants/error-msg-definitions'
import { push } from 'connected-react-router'
import ROUTES from '../util/routes'

const postCHANGEPassFormRequest = () => ({ type: actionType.POST_CHANGE_PASS_FORM_REQUEST })
const postCHANGEPassFormError = () => ({ type: actionType.POST_CHANGE_PASS_FORM_ERROR })

const UPDATE_CHANGE_PASS_URL = '/api/forgotpassword/update'

export const postCHANGEPassFormData = (payload) => {
    // console.log(payload)
    return (dispatch, getState) => {
        dispatch(postCHANGEPassFormRequest())
        let URL = UPDATE_CHANGE_PASS_URL
        if (URL) {
            const state = getState()
            const lang = 'en'
            const headers = { Authorization: `bearer ${state.auth.token}` }
            axiosRequest.post(URL, payload, { headers })
                .then(response => {
                    const data = response.data
                    console.log(response)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : "Éxito")
                        dispatch(push(ROUTES.CHANGE_PASSWORD_SUCCESS))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, "No se puede cambiar la contraseña")
                        dispatch(postCHANGEPassFormError())
                    }
                })
                .catch(error => {
                    console.log(error)
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postCHANGEPassFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postCHANGEPassFormError())
        }
    }

}

