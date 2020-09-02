import actionType from '../actions/actionTypes'

const initialState = {
    restaurantId: null,
    comerRestauranteEnabled: null,
    acceptReservations: null,
    paraLlevarEnabled: null,
    deliveryOptions: null,
    servicioHabitacionEnabled: null,
    entregaParqueoEnabled: null,
    entregaParqueoOptions: null,
    expressEnabled:null,
    expressPrecioEnvio: null,
    expressCada: null,
    expressEnvioGratisEnabled: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_DELIVERY_METHOD_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.GET_DELIVERY_METHOD_FORM_SUCCESS:
            console.log(action.payload)

            return {
                ...state,
                loading: false,
                ...action.payload,
                // restaurantId: action.payload.restaurantId,
                // comerRestauranteEnabled: action.payload.comerRestauranteEnabled,
                // acceptReservations: action.payload.acceptReservations,
                // paraLlevarEnabled: action.payload.paraLlevarEnabled,
                // deliveryOptions: action.payload.deliveryOptions,
                // servicioHabitacionEnabled: action.payload.servicioHabitacionEnabled,
                // entregaParqueoEnabled: action.payload.entregaParqueoEnabled,
                // entregaParqueoOptions: action.payload.entregaParqueoOptions,
                // expressPrecioEnvio: action.payload.expressPrecioEnvio,
                // expressCada: action.payload.expressCada,
                // expressEnvioGratisEnabled: action.payload.expressEnvioGratisEnabled,
            }

        case actionType.GET_DELIVERY_METHOD_FORM_ERROR:
            return { ...state, loading: false }

        case actionType.POST_DELIVERY_METHOD_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.POST_DELIVERY_METHOD_FORM_SUCCESS:
            console.log(action.payload)
            return { ...state, loading: false }

        case actionType.POST_DELIVERY_METHOD_FORM_ERROR:
            return { ...state, loading: false }

        default:
            return state
    }
}
