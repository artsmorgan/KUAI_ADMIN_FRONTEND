import actionType from '../actions/actionTypes'

const initialState = {
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_RESTAURANT_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.GET_RESTAURANT_FORM_SUCCESS:
            // console.log(action.payload)

            return {
                ...state,
                loading: false,
                ...action.payload,
            }

        case actionType.GET_RESTAURANT_FORM_ERROR:
            return { ...state, loading: false }

        case actionType.POST_RESTAURANT_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.POST_RESTAURANT_FORM_SUCCESS:
            // console.log(action.payload)
            return {...state,loading: false}

        case actionType.POST_RESTAURANT_FORM_ERROR:
            return { ...state, loading: false }

        default:
            return state
    }
}
