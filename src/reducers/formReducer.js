import actionType from '../actions/actionTypes'

const initialState = {
    DASHBOARD: {},
    loading: false,
    TRANSFER_MONEY: {},
    TRANSFER_MONEY_SUCCESS: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.GET_FORM_SUCCESS:
            const { step, data } = action.payload
            // console.log(step)
            // console.log(data)
            state[step] = data
            return { ...state, loading: false }

        case actionType.GET_FORM_ERROR:
            return { ...state, loading: false }

        case actionType.POST_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.POST_FORM_SUCCESS:
            return { ...state, loading: false }

        case actionType.POST_FORM_ERROR:
            return { ...state, loading: false }

        default:
            return state
    }
}
