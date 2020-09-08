import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const postTechSupportFormRequest = () => ({ type: actionType.POST_TECH_SUPPORT_FORM_REQUEST })
const postTechSupportFormSuccess = (payload) => ({ type: actionType.POST_TECH_SUPPORT_FORM_SUCCESS, payload })
const postTechSupportFormError = () => ({ type: actionType.POST_TECH_SUPPORT_FORM_ERROR })

const TECH_SUPPORT_URL = '/api/techsupport'

export const postTechSupportFormData = (payload) => {
    // console.log(payload)
    return (dispatch, getState) => {
        dispatch(postTechSupportFormRequest())
        let URL = TECH_SUPPORT_URL
        if (URL) {
            const state = getState()
            const lang = 'en'
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let formattedPayload = {
                restaurantId: payload.restaurantId,
                motivo: payload.motivo,
                detalles: payload.detalles
            }
            axiosRequest.post(URL, formattedPayload, { headers })
                .then(response => {
                    const data = response.data
                    console.log(response)
                    if (data.success) {
                        toastr.success(language[lang].success, data.message ? data.message : language[lang].success)
                        dispatch(postTechSupportFormSuccess(data))
                    } else {
                        const response = data.data
                        toastr.error(language[lang].error, "No record found with this email")
                        dispatch(postTechSupportFormError())
                    }
                })
                .catch(error => {
                    console.log(error)
                    const response = error.response
                    toastr.error(language[lang].error, language[lang].postFailed)
                    dispatch(postTechSupportFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(postTechSupportFormError())
        }
    }

}