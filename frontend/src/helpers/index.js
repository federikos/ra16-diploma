import { fetchProducts } from '../actions/actionCreators';
import { debounce } from 'lodash';

export const formatPrice = (price) => `${Number(price).toFixed(0)} руб.`;
export const debouncedFetch = debounce((dispatch) => dispatch(fetchProducts(0)), 500);
