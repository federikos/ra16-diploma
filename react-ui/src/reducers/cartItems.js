import {
  REPLACE_CART_ITEMS,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  cartItemsCount: 0,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case REPLACE_CART_ITEMS:
      const { items } = action.payload;

      return {
        items: [...items],
        cartItemsCount: items.length,
      };
    default:
      return state;
  }
}
