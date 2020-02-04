import React from 'react';
import PropTypes from 'prop-types';

import styles from './Highlight.css';

const Highlight = ({
  children, style, className, color,
}) => (
  <span style={{ backgroundColor: color, ...style }} className={`${styles.highlight} diorama-highlight ${className}`}>
    {children}
  </span>
);

Highlight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.shape({}),
};

Highlight.defaultProps = {
  className: '',
  color: undefined,
  style: {},
};

export default Highlight;
