import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import {logout} from './authAction'
import {toastr} from "react-redux-toastr";
import language from "../constants/error-msg-definitions";

const getDefaultConfigRequest = () => ({ type: actionType.GET_DEFAULT_CONFIG_REQUEST })
const getDefaultConfigSuccess = (payload) => ({ type: actionType.GET_DEFAULT_CONFIG_SUCCESS, payload })
const getDefaultConfigError = () => ({ type: actionType.GET_CATEGORY_LIST_ERROR })

const restaurantId = localStorage.getItem('restaurantId');

const GET_DEFAULT_CONFIG_URL = '/api/site/' + restaurantId;

export const getDefaultConfigData = () => {
    return (dispatch, getState) => {
        if (!restaurantId) {
            // dispatch(logout())
            logout(dispatch)
            const lang = 'en'
            toastr.error(language[lang].error, "Unauthorized access")
        } else {
            dispatch(getDefaultConfigRequest())
            let URL = GET_DEFAULT_CONFIG_URL

            if (URL) {
                const state = getState()
                const headers = { Authorization: `bearer ${state.auth.token}` }
                let params = {}
                axiosRequest.get(URL, { headers, params })
                    .then(response => {
                        console.log(response.data)
                        dispatch(getDefaultConfigSuccess(response.data))
                    })
                    .catch(error => {
                        const response = error.response
                        console.log(response)
                        dispatch(getDefaultConfigError())
                        if (response && response.status === 401) {
                            // logout(dispatch)
                        }
                    })
            } else {
                dispatch(getDefaultConfigError())
            }
        }
    }

}