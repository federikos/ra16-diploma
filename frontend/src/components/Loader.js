import React from 'react';
import PropTypes from 'prop-types';

const withSection = ({loading}) => {
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

withSection.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default withSection;