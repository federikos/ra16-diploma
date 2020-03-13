import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { productsListSelector } from '../../selectors';
import { fetchProducts } from '../../actions/actionCreators';

const LoadBtn = ({ items }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(productsListSelector);
  const loadBtnVisible = !loading && (items.length % 6 === 0);
  const handleLoadMore = () => {
    dispatch(fetchProducts(items.length));
  };

  if (!loadBtnVisible) return null;

  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={handleLoadMore} type="button">
        Загрузить ещё
      </button>
    </div>
  );
};

LoadBtn.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

LoadBtn.defaultProps = {
  items: [],
};

export default LoadBtn;
