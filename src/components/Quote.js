import React from 'react';
import PropTypes from 'prop-types';

import styles from './Quote.css';

const Quote = ({
  children, quotee, style, className,
}) => (
  <>
    <blockquote style={style} className={`${styles.quote} diorama-title ${className}`}>
      {children}
    </blockquote>
    {quotee && <cite className={styles.cite}>{quotee}</cite>}
  </>
);

Quote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  quotee: PropTypes.node,
};

Quote.defaultProps = {
  className: '',
  style: {},
  quotee: undefined,
};

export default Quote;
