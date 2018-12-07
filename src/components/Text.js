import React from 'react';
import PropTypes from 'prop-types';

import styles from './Text.css';

const Text = ({ children, style, className }) => (
  <p style={style} className={`${styles.text} diorama-text ${className}`}>
    {children}
  </p>
);

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

Text.defaultProps = {
  className: '',
  style: {},
};

export default Text;
