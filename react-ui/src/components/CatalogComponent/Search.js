import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debouncedFetch } from '../../helpers';
import PropTypes from 'prop-types';
import { productsListSelector } from '../../selectors';
import { setSearchValue } from '../../actions/actionCreators';

const Search = ({ isVisible }) => {
  const dispatch = useDispatch();
  const { query } = useSelector(productsListSelector);

  const handleInputChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    debouncedFetch(dispatch);
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
