import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setCartItems, fetchProduct } from '../actions/actionCreators';
import { cartItemsSelector, productSelector } from '../selectors';
import ProductView from '../components/ProductView';

const Product = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const { items } = useSelector(cartItemsSelector);
  const { product, loading, error } = useSelector(productSelector);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const changeQuantity = (e) => {
    const { type } = e.currentTarget.dataset;
    setSelectedQuantity((prevQuantity) => {
      if (type === 'increase') {
        return prevQuantity + 1;
      }
      return prevQuantity - 1;
    });
  };

  const addToCart = () => {
    const foundItem = items.find((item) => item.id === product.id && item.size === selectedSize);
    let newItems = [...items.map((item) => ({ ...item }))];
    let newItem;

    if (!foundItem) {
      newItem = {
        id: product.id,
        title: product.title,
        size: selectedSize,
        price: product.price,
        total: product.price * selectedQuantity,
        count: selectedQuantity,
      };
    }

    if (foundItem) {
      newItem = {
        ...foundItem,
        count: foundItem.count + selectedQuantity,
        price: product.price,
        total: foundItem.total + product.price * selectedQuantity,
      };

      newItems = items.filter((item) => !(item.id === product.id && item.size === selectedSize));
    }

    newItems = newItems.concat(newItem);
    dispatch(setCartItems(newItems));
    history.push('/cart');
  };

  useEffect(() => {
    dispatch(fetchProduct(history, id));
  }, [id]);

  const isProduct = Boolean(Object.keys(product).length);
  const avalibleSizes = isProduct ? product.sizes.filter((size) => size.avalible) : null;

  return (
    <ProductView
      loading={loading}
      error={error}
      isProduct={isProduct}
      product={product}
      avalibleSizes={avalibleSizes}
      selectedSize={selectedSize}
      setSelectedSize={setSelectedSize}
      changeQuantity={changeQuantity}
      selectedQuantity={selectedQuantity}
      setSelectedQuantity={setSelectedQuantity}
      addToCart={addToCart}
    />
  );
};

Product.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(Product);
