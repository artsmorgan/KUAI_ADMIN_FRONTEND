import actionType from '../actions/actionTypes'

const initialState = {loading: false}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CATEGORY_LIST_REQUEST:
            return {...state, loading: true}

        case actionType.GET_CATEGORY_LIST_SUCCESS:
            console.log(action.payload)
            state['CATEGORY_LIST'] = action.payload
            return {...state, loading: false}

        case actionType.GET_CATEGORY_LIST_ERROR:
            return {...state, loading: false}

        case actionType.POST_CATEGORY_FORM_REQUEST:
            return {...state, loading: true}

        case actionType.POST_CATEGORY_FORM_SUCCESS:
            return {...state, loading: false}

        case actionType.POST_CATEGORY_FORM_ERROR:
            return {...state, loading: false}

        default:
            return state
    }
}