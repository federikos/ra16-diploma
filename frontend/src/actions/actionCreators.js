import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS_FIRST,
  FETCH_PRODUCTS_SUCCESS_MORE,
  SHOW_LOAD_BUTTON,
  HIDE_LOAD_BUTTON,
  FETCH_CATEGORIES_SUCCESS,
  SET_LOADING_FALSE,
  SET_CATEGORY_ID,
  SET_SEARCH_STRING,
  CLEAR_SEARCH_STRING,
} from './actionTypes';

export const fetchProductsRequest =() => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: {
    error,
  },
});

export const fetchProductsSuccessFirst = items => ({
  type: FETCH_PRODUCTS_SUCCESS_FIRST,
  payload: {
    items,
  },
});

export const fetchProductsSuccessMore = items => ({
  type: FETCH_PRODUCTS_SUCCESS_MORE,
  payload: {
    moreItems: items,
  },
});

export const showLoadBtn = () => ({
  type: SHOW_LOAD_BUTTON,
});

export const hideLoadBtn = () => ({
  type: HIDE_LOAD_BUTTON,
});

export const fetchCategoriesSuccess = items => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    items,
  },
});

export const setProductsLoadingFalse = () => ({
  type: SET_LOADING_FALSE,
});

export const setCategoryId = id => ({
  type: SET_CATEGORY_ID,
  payload: {
    categoryId: id,
  }
});

export const setSearchValue = searchString => ({
  type: SET_SEARCH_STRING,
  payload: {
    searchString
  }
})

export const fetchProducts = (id, offset, q) => async (dispatch) => {
  dispatch(fetchProductsRequest());
  const fetchUrl = getProductsUrl(id, offset, q);

  try {
    const response = await fetch(fetchUrl);

    const data = await response.json();
    if (!data.length || data.length < 6) {
      dispatch(hideLoadBtn());
    }
    if (offset === 0) {
      dispatch(fetchProductsSuccessFirst(data));
    }
    if (offset > 0) {
      dispatch(fetchProductsSuccessMore(data));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchProductsRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}categories`);

    const data = await response.json();
      dispatch(fetchCategoriesSuccess(data));
      dispatch(setProductsLoadingFalse());
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

const getProductsUrl = (id, offset, q) => {
  let fetchUrl = `${process.env.REACT_APP_BASE_URL}items?offset=${offset}`;

  if (id) {
      fetchUrl += `&categoryId=${id}`
  }

  if (q) {
      fetchUrl += `&q=${q}`
  }

return fetchUrl
}

