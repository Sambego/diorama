import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import styles from './List.css';

const List = ({
  children, ordered, style, className,
}) => {
  const renderItems = () => {
    if (Array.isArray(children)) {
      return children.map((child, index) => cloneElement(child, {
        className: `${styles.item} diorama-list-item`,
        key: index,
      }));
    }

    return cloneElement(children, {
      className: `${styles.item} diorama-list-item`,
    });
  };

  if (ordered) {
    return (
      <ol className={`${styles.ol} diorama-list diorama-list-unordered ${className}`} style={style}>
        {renderItems()}
      </ol>
    );
  }

  return (
    <ul className={`${styles.list} diorama-list diorama-list-unordered ${className}`} style={style}>
      {renderItems()}
    </ul>
  );
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  ordered: PropTypes.bool,
  style: PropTypes.shape({}),
};

List.defaultProps = {
  className: '',
  ordered: false,
  style: {},
};

export default List;
