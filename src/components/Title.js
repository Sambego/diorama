import React from 'react';
import PropTypes from 'prop-types';

import styles from './Title.css';

const Title = ({ children, style }) => (
  <h1 style={style} className={`${styles.title} diorama-title`}>
    {children}
  </h1>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

Title.defaultProps = {
  style: {},
};

export default Title;
