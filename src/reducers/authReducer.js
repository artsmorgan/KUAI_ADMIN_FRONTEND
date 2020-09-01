import actionType from '../actions/actionTypes'

const initialState = {
    loginToken: null,
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
            // console.log(action.payload)
            const tokenExpiredAt = new Date().getTime() + (60000 * 45)
            const tokenB64 = Buffer.from(action.payload.token + ':' + '000777').toString('base64')
            localStorage.setItem('loginToken', action.payload.token)
            localStorage.setItem('loginRefreshToken', action.payload.refreshToken)
            localStorage.setItem('token', tokenB64)
            localStorage.setItem('tokenExpiredAt', tokenExpiredAt)
            return {
                ...state,
                loading: false,
                loginToken: action.payload.token,
                refreshToken: action.payload.refreshToken,
                token: tokenB64,
                tokenExpiredAt
            }

        case actionType.LOGIN_POST_ERROR:
            return { ...state, loading: false }

        case actionType.SET_LOGIN_CRED:
            // console.log("SET_LOGIN_CRED:", action.payload)
            return { ...state, ...action.payload }

        case actionType.FLUSH_LOGIN_CRED:
            state.loginToken = null
            state.refreshToken = null
            state.token = null
            state.tokenExpiredAt = null
            return { ...state }

        default:
            return state
    }
}
