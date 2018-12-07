import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slide.css';

const Slide = ({ children, style }) => (
  <div style={style} className={`${styles.slide} diorama-slide`}>
    {children}
  </div>
);

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

Slide.defaultProps = {
  style: {},
};

export default Slide;
