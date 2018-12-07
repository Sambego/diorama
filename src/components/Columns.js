import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import styles from './Columns.css';

const Columns = ({ children }) => {
  const renderColumns = () => children.map((child, index) => cloneElement(child, {
    className: `${styles.column} diorama-column`,
    key: index,
    style: { maxWidth: `${100 / children}%` },
  }));

  return <div className={`${styles.columns} diorama-columns`}>{renderColumns()}</div>;
};

Columns.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Columns;
