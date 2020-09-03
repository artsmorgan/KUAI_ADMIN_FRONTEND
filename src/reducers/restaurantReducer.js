import actionType from '../actions/actionTypes'

const initialState = {
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_RESTAURANT_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.GET_RESTAURANT_FORM_SUCCESS:
            console.log(action.payload)

            return {
                ...state,
                loading: false,
                ...action.payload,
                // name: action.payload.name,
                // administrator: action.payload.administrator,
                // fb: action.payload.fb,
                // ig: action.payload.ig,
                // province: action.payload.province,
                // canton: action.payload.canton,
                // district: action.payload.district,
                // neighborhood: action.payload.neighborhood,
                // otherSigns: action.payload.otherSigns,
                // mondayEnable: action.payload.mondayEnable,
                // mondayOpen: action.payload.mondayOpen,
                // mondayClose: action.payload.mondayClose,
                // tuesdayEnable: action.payload.tuesdayEnable,
                // tuesdayOpen: action.payload.tuesdayOpen,
                // tuesdayClose: action.payload.tuesdayClose,
                // wednesdayEnable: action.payload.wednesdayEnable,
                // wednesdayOpen: action.payload.wednesdayOpen,
                // wednesdayClose: action.payload.wednesdayClose,
                // thursdayEnable: action.payload.thursdayEnable,
                // thursdayOpen: action.payload.thursdayOpen,
                // thursdayClose: action.payload.thursdayClose,
                // fridayEnable: action.payload.fridayEnable,
                // fridayOpen: action.payload.fridayOpen,
                // fridayClose: action.payload.fridayClose,
                // saturdayEnable: action.payload.saturdayEnable,
                // saturdayOpen: action.payload.saturdayOpen,
                // saturdayClose: action.payload.saturdayClose,
                // sundayEnable: action.payload.sundayEnable,
                // sundayOpen: action.payload.sundayOpen,
                // sundayClose: action.payload.sundayClose,
                // owner: action.payload.owner,
            }

        case actionType.GET_RESTAURANT_FORM_ERROR:
            return { ...state, loading: false }

        case actionType.POST_RESTAURANT_FORM_REQUEST:
            return { ...state, loading: true }

        case actionType.POST_RESTAURANT_FORM_SUCCESS:
            console.log(action.payload)
            return {...state,loading: false}

        case actionType.POST_RESTAURANT_FORM_ERROR:
            return { ...state, loading: false }

        default:
            return state
    }
}
