import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slide.css';

const Slide = ({ children, style, className }) => (
  <div style={style} className={`${styles.slide} diorama-slide ${className}`}>
    {children}
  </div>
);

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

Slide.defaultProps = {
  className: '',
  style: {},
};

export default Slide;
