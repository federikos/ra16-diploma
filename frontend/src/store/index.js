import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import productsListReducer from '../reducers/productsList';
import categoriesListReducer from '../reducers/categoriesList';
import searchReducer from '../reducers/search';
import cartReducer from '../reducers/cart';

const reducer = combineReducers({
  productsList: productsListReducer,
  categoriesList: categoriesListReducer,
  search: searchReducer,
  cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)),
);

export default store;