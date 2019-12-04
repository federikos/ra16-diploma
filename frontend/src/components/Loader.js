import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({loading}) => {
  if (!loading) return null;
  
  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;