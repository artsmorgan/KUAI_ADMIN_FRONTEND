import actionType from './actionTypes'
import { axiosRequest } from '../util/api'
import ROUTES from '../util/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import language from '../constants/error-msg-definitions'

const getControlCenterMethodFormRequest = () => ({ type: actionType.GET_CONTROL_CENTER_METHOD_FORM_REQUEST })
const getControlCenterMethodFormSuccess = (payload) => ({ type: actionType.GET_CONTROL_CENTER_METHOD_FORM_SUCCESS, payload })
const getControlCenterMethodFormError = () => ({ type: actionType.GET_DELIVERY_METHOD_FORM_ERROR })


const GET_CONTROL_CENTER_METHOD_URL = '/api/site/';


export const getControlCenterMethodFormData = (payload) => {
    return (dispatch, getState) => {
        dispatch(getControlCenterMethodFormRequest())
        let URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/dashboard/' + payload.restaurantId;
        // console.log("---------------")
        // console.log(URL)
        if (URL) {
            const state = getState()
            const headers = { Authorization: `bearer ${state.auth.token}` }
            let params = {}
            axiosRequest.get(URL, { headers, params })
                .then(response => {
                    // console.log(response)
                    dispatch(getControlCenterMethodFormSuccess(response.data))
                })
                .catch(error => {
                    const response = error.response
                    // console.log(response)
                    dispatch(getControlCenterMethodFormError())
                    if (response && response.status === 401) {
                        // logout(dispatch)
                    }
                })
        } else {
            dispatch(getControlCenterMethodFormError())
        }
    }

}


