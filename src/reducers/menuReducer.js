import actionType from '../actions/actionTypes'

const initialState = {categories: {loading: true, categories: []}, dishes: {loading: true, dishes: []}}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORY_LIST_REQUEST:
      return {...state, categories: {loading: true}}

    case actionType.GET_CATEGORY_LIST_SUCCESS:
      // console.log(action.payload)
      state['CATEGORY_LIST'] = action.payload
      return {...state, categories: {loading: false, categories: JSON.parse(action.payload.categories)}}

    case actionType.GET_CATEGORY_LIST_ERROR:
      return {...state, categories: {loading: false, categories: []}}

    case actionType.GET_MENU_LIST_REQUEST:
      return {...state, loading: true}

    case actionType.GET_MENU_LIST_SUCCESS:
      state['MENU_LIST'] = action.payload
      return {...state, loading: false}

    case actionType.GET_MENU_LIST_ERROR:
      return {...state, loading: false}

    case actionType.POST_CATEGORY_FORM_REQUEST:
      return {...state, loading: true}

    case actionType.POST_CATEGORY_FORM_SUCCESS:
      return {...state, loading: false}

    case actionType.POST_CATEGORY_FORM_ERROR:
      return {...state, loading: false}

    case actionType.POST_MENU_FORM_REQUEST:
      return {...state, loading: true}

    case actionType.POST_MENU_FORM_SUCCESS:
      return {...state, loading: false}

    case actionType.POST_MENU_FORM_ERROR:
      return {...state, loading: false}

    default:
      return state
  }
}