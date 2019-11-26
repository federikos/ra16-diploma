import {
  SET_SEARCH_STRING,
  CLEAR_SEARCH_STRING,
} from '../actions/actionTypes'

const initialState = {
  searchString: '',
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_STRING:
      const {searchString} = action.payload;
      return {
        ...state,
        searchString,
      };
    case CLEAR_SEARCH_STRING:
      return {
        ...state,
        searchString: initialState.searchString,
      };
    default:
      return state;
  }
}