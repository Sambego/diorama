import React, { cloneElement } from 'react';

import styles from './Columns.css';

export interface ColumnsProps {
  children: React.ReactElement<{ className?: string; style?: React.CSSProperties }>[];
  className?: string;
}

const Columns = ({ children, className = '' }: ColumnsProps) => {
  const renderColumns = () => children.map((child, index) => cloneElement(child, {
    className: `${styles.column} diorama-column ${className} `,
    key: index,
    style: { maxWidth: `${100 / children.length}%` },
  }));

  return <div className={`${styles.columns} diorama-columns`}>{renderColumns()}</div>;
};

export default Columns;
