import actionType from '../actions/actionTypes'

const initialState = {
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.POST_FORGOT_PASS_FORM_REQUEST:
            return {...state, loading: true}

        case actionType.POST_FORGOT_PASS_FORM_SUCCESS:
            // console.log(action)
            return {...state, ...action.payload, loading: false}

        case actionType.POST_FORGOT_PASS_FORM_ERROR:
            return {...state, loading: false}

        default:
            return state
    }
}