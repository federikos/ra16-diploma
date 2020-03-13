import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
} from '../actions/actionTypes';

const initialState = {
  product: {},
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCT_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_PRODUCT_SUCCESS:
      const { product } = action.payload;
      return {
        ...state,
        loading: false,
        product,
      };
    case CLEAR_PRODUCT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
