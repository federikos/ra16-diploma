import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const HeaderSearch = ({ searchInvisible }) => (
  <form data-id="search-form" className={clsx('header-controls-search-form', 'form-inline', searchInvisible && 'invisible')}>
    <input className="form-control" placeholder="Поиск" />
  </form>
);

HeaderSearch.propTypes = {
  searchInvisible: PropTypes.bool.isRequired,
};

export default HeaderSearch;
