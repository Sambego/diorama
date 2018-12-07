import React from 'react';
import PropTypes from 'prop-types';

import styles from './Subtitle.css';

const Subtitle = ({ children, style }) => (
  <h2 style={style} className={`${styles.subtitle} diorama-subtitle`}>
    {children}
  </h2>
);

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

Subtitle.defaultProps = {
  style: {},
};

export default Subtitle;
