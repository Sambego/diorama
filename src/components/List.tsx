import React, { cloneElement } from 'react';

import styles from './List.css';

export interface ListProps {
  children: React.ReactElement<{ className?: string }> | React.ReactElement<{ className?: string }>[];
  className?: string;
  ordered?: boolean;
  style?: React.CSSProperties;
}

const List = ({
  children, ordered = false, style = {}, className = '',
}: ListProps) => {
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

export default List;
