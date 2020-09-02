import actionType from '../actions/actionTypes'

const initialState = {
    accessToken: null,
    refreshToken: null,
    token: null,
    tokenExpiredAt: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_POST_REQUEST:
            return { ...state, loading: true }

        case actionType.LOGIN_POST_SUCCESS:
            console.log(action.payload)
            localStorage.setItem('accessToken', action.payload.user.stsTokenManager.accessToken)
            localStorage.setItem('refreshToken', action.payload.user.stsTokenManager.refreshToken)
            localStorage.setItem('token', action.payload.user.stsTokenManager.apiKey)
            localStorage.setItem('tokenExpiredAt', action.payload.user.stsTokenManager.expirationTime)
            localStorage.setItem('restaurantId', action.payload.metadata.restaurantId)
            return {
                ...state,
                loading: false,
                accessToken: action.payload.user.stsTokenManager.accessToken,
                refreshToken: action.payload.user.stsTokenManager.refreshToken,
                token: action.payload.user.stsTokenManager.apiKey,
                tokenExpiredAt: action.payload.user.stsTokenManager.expirationTime,
                restaurantId: action.payload.metadata.restaurantId
            }

        case actionType.LOGIN_POST_ERROR:
            return { ...state, loading: false }

        case actionType.SET_LOGIN_CRED:
            // console.log("SET_LOGIN_CRED:", action.payload)
            return { ...state, ...action.payload }

        case actionType.FLUSH_LOGIN_CRED:
            state.accessToken = null
            state.refreshToken = null
            state.token = null
            state.tokenExpiredAt = null
            state.restaurantId = null
            return { ...state }

        default:
            return state
    }
}
