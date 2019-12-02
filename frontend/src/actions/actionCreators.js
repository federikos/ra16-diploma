import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS_FIRST,
  FETCH_PRODUCTS_SUCCESS_MORE,
  CLEAR_PRODUCTS,
  SHOW_LOAD_BUTTON,
  HIDE_LOAD_BUTTON,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  SET_LOADING_FALSE,
  SET_CATEGORY_ID,
  SET_SEARCH_STRING,
  CLEAR_SEARCH_STRING,
  REPLACE_CART_ITEMS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  CHANGE_FORM_INPUT,
  CLEAR_FORM,
} from './actionTypes';
import {getProductsUrl} from '../helpers';

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

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS,
})

export const showLoadBtn = () => ({
  type: SHOW_LOAD_BUTTON,
});

export const hideLoadBtn = () => ({
  type: HIDE_LOAD_BUTTON,
});

export const fetchCategoriesRequest =() => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    error,
  },
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

export const replaceCartItems = items => ({
  type: REPLACE_CART_ITEMS,
  payload: {
    items,
  }
})

export const sendOrderRequest = () => ({
  type: SEND_ORDER_REQUEST
})

export const sendOrderSuccess = () => ({
  type: SEND_ORDER_SUCCESS
})

export const sendOrderError = error => ({
  type: SEND_ORDER_ERROR,
  payload: {
    error
  }
})

export const changeFormInput = (name, value) => ({
  type: CHANGE_FORM_INPUT,
  payload: {name, value}
})

export const clearForm = () => ({
  type: CLEAR_FORM,
})

export const sendOrder = (items, form) => dispatch => {
  dispatch(sendOrderRequest());
  const orderData = items.map(item => {
    return {id: item.id, price: item.price, count: item.count}
  });
  fetch(`${process.env.REACT_APP_BASE_URL}order`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      owner: {
        phone: form.phone,
        address: form.address,
      },
      items: orderData
    })
  })
    .then(res => {
      if (res.status === 204) {
        dispatch(clearForm())
        dispatch(setCartItems([]));
        dispatch(sendOrderSuccess())
      }
    })
    .catch(error => dispatch(sendOrderError(error)))
}

export const setCartItems = items => dispatch => {
  dispatch(replaceCartItems(items));
  localStorage.setItem('cart', JSON.stringify(items));
}

export const restoreCartFromLS = () => dispatch => {
  const items = JSON.parse(localStorage.getItem('cart'));
  if(items) {
    dispatch(replaceCartItems(items));
  }
}

export const fetchProducts = (offset) => async (dispatch, getState) => {
  const {search: {searchString}, categoriesList: {categoryId}} = getState()
  dispatch(fetchProductsRequest());
  dispatch(hideLoadBtn());

  if (!offset) {
    dispatch(clearProducts());
  }

  const fetchUrl = getProductsUrl(categoryId, offset, searchString);

  try {
    const response = await fetch(fetchUrl, {headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});

    const data = await response.json();

    if (data.length && data.length === 6) {
      dispatch(showLoadBtn());
    }

    if (offset === 0) {
      dispatch(fetchProductsSuccessFirst(data));
    }
    if (offset > 0) {
      dispatch(fetchProductsSuccessMore(data));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
    dispatch(showLoadBtn());
  }
};

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}categories`);

    const data = await response.json();
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export const searchProducts = searchString => async dispatch => {
  dispatch(setSearchValue(searchString));
  dispatch(fetchProducts(0));
}
