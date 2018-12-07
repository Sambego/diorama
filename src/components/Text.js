import React from 'react';
import PropTypes from 'prop-types';

import styles from './Text.css';

const Text = ({ children, style }) => (
  <p style={style} className={`${styles.text} diorama-text`}>
    {children}
  </p>
);

Text.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

Text.defaultProps = {
  style: {},
};

export default Text;
