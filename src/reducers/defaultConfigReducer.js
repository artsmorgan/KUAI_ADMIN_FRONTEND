import actionType from '../actions/actionTypes'

const initialState = {loading: false}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_DEFAULT_CONFIG_REQUEST:
            return {...state, loading: true}

        case actionType.GET_DEFAULT_CONFIG_SUCCESS:
            console.log(action.payload)
            state['DEFAULT_CONFIG'] = action.payload
            return {...state, loading: false}

        case actionType.GET_DEFAULT_CONFIG_ERROR:
            return {...state, loading: false}

        default:
            return state
    }
}