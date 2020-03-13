import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Message = ({ type, message }) => {
  if (!message) return null;
  return (
    <p className={clsx('message', type)}>{message}</p>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
  message: PropTypes.string,
};

Message.defaultProps = {
  message: null,
};

export default Message;
