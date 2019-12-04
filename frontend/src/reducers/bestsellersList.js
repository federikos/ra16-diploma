import {
  FETCH_BESTSELLERS_REQUEST,
  FETCH_BESTSELLERS_FAILURE,
  FETCH_BESTSELLERS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function bestsellersListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BESTSELLERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BESTSELLERS_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_BESTSELLERS_SUCCESS:
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items,
      };
    default:
      return state;
  }
}