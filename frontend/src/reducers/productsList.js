import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS_FIRST,
  FETCH_PRODUCTS_SUCCESS_MORE,
  SHOW_LOAD_BUTTON,
  HIDE_LOAD_BUTTON,
  SET_LOADING_FALSE,
} from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
  loadBtnVisible: true,
};

export default function productsListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_PRODUCTS_SUCCESS_FIRST:
      const {items} = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS_MORE:
      const {moreItems} = action.payload;
      return {
        ...state,
        items: [...state.items, ...moreItems],
        loading: false,
        error: null,
      };
    case SHOW_LOAD_BUTTON:
      return {
        ...state,
        loadBtnVisible: true,
      };
    case HIDE_LOAD_BUTTON:
      return {
        ...state,
        loadBtnVisible: false,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}
