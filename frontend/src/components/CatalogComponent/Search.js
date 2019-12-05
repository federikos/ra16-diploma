import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { productsListSelector } from '../../selectors';
import { searchProducts } from '../../actions/actionCreators';

const Search = ({ isVisible }) => {
  const dispatch = useDispatch();
  const { query } = useSelector(productsListSelector);

  const handleInputChange = (e) => {
    dispatch(searchProducts(e.target.value));
  };

  if (!isVisible) return null;

  return (
    <form className="catalog-search-form form-inline">
      <input className="form-control" placeholder="Поиск" value={query} onChange={handleInputChange} />
    </form>
  );
};

Search.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Search;
