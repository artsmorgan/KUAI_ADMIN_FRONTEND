import actionType from '../actions/actionTypes'

const initialState = {
    loading: false,
    data:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_ORDER_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.GET_ORDER_FORM_SUCCESS:
            // console.log(action.payload)

            return {
                ...state,
                loading: false,
                data:action.payload,
            }

        case actionType.GET_ORDER_FORM_ERROR:
            return { ...state, loading: false }

        case actionType.POST_ORDER_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.POST_ORDER_FORM_SUCCESS:
            // console.log(action.payload)
            return {...state,loading: false}

        case actionType.POST_ORDER_FORM_ERROR:
            return { ...state, loading: false }

        default:
            return state
    }
}
