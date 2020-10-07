import actionType from '../actions/actionTypes'

const initialState = {
  loading: false,
  categories: {
    loading: false,
    data: []
  },
  items: {
    loading: false,
    data: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORY_LIST_REQUEST:
      return { ...state, categories: { ...state.categories, loading: true } }


    case actionType.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categories: {
          loading: false,
          data: JSON.parse(action.payload.categories)
        },
      }


    case actionType.GET_CATEGORY_LIST_ERROR:
      return { ...state, categories: { loading: false, data: [] } }


    case actionType.POST_CATEGORY_FORM_REQUEST:
      return { ...state, loading: false }


    case actionType.POST_CATEGORY_FORM_SUCCESS:
      return { ...state, loading: false }


    case actionType.POST_CATEGORY_FORM_ERROR:
      return { ...state, loading: false }



    case actionType.GET_MENU_LIST_REQUEST:
      return { ...state, items: {...state.categories, loading: true } }


    case actionType.GET_MENU_LIST_FULL_SUCCESS:
      return {
        ...state,
        items: {
          loading: false,
          data: action.payload.productList
        },
      }

    case actionType.GET_MENU_LIST_ERROR:
      return { ...state, items: { loading: true, data: [] } }


    case actionType.POST_MENU_FORM_REQUEST:
      return { ...state, items: {...state.categories, loading: true } }

    case actionType.POST_MENU_FORM_SUCCESS:
      return { ...state, items: 
        { 
          loading: false,
          data: [],
       } 
      }

    case actionType.POST_MENU_FORM_ERROR:
      return { ...state, items: { loading: false,data: [] } }

    default:
      return state
  }
}