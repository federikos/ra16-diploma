import {
  SET_SEARCH_STRING,
  CLEAR_SEARCH_STRING,
} from '../actions/actionTypes'

const initialState = {
  query: '',
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_STRING:
      const {query} = action.payload;
      return {
        ...state,
        query,
      };
    case CLEAR_SEARCH_STRING:
      return {
        ...state,
        query: initialState.query,
      };
    default:
      return state;
  }
}