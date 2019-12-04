import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import productsListReducer from '../reducers/productsList';
import categoriesListReducer from '../reducers/categoriesList';
import cartItemsReducer from '../reducers/cartItems';
import cartFormReducer from '../reducers/cartForm';
import productReducer from '../reducers/product';

const reducer = combineReducers({
  productsList: productsListReducer,
  categoriesList: categoriesListReducer,
  cartItems: cartItemsReducer,
  cartForm: cartFormReducer,
  product: productReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)),
);

export default store;