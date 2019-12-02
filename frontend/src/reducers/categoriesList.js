import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  SET_CATEGORY_ID,
} from '../actions/actionTypes'

const initialState = {
  items: [],
  categoryId: null,
  loading: false,
  error: null
};

export default function categoriesListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
    case FETCH_CATEGORIES_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_CATEGORIES_SUCCESS:
      const {items} = action.payload;
      return {
        ...state,
        loading: false,
        items,
      };
    case SET_CATEGORY_ID:
      const {categoryId} = action.payload;
      return {
        ...state,
        categoryId,
      };
    default:
      return state;
  }
}
