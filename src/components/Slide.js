import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slide.css';

const Slide = ({
  children, style, className, scale,
}) => (
  <div style={style} className={`${styles.slide} diorama-slide ${className}`}>
    <div className={`diorama-content ${styles.content}`} style={{ transform: `scale(${scale})` }}>
      {children}
    </div>
  </div>
);

/* eslint-disable react/no-unused-prop-types */
Slide.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  notes: PropTypes.string,
  scale: PropTypes.string,
  style: PropTypes.shape({}),
};
/* eslint-enable react/no-unused-prop-types */

Slide.defaultProps = {
  className: '',
  notes: undefined,
  scale: '1',
  style: {},
};

export default Slide;
