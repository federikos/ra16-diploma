import {
  FETCH_CATEGORIES_SUCCESS,
  SET_CATEGORY_ID,
} from '../actions/actionTypes'

const initialState = {
  items: [],
  categoryId: null
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      const {items} = action.payload;
      return {
        ...state,
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
