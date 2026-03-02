import React from 'react';

import styles from './Highlight.css';

export interface HighlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

const Highlight = ({
  children, style = {}, className = '', color,
}: HighlightProps) => (
  <span style={{ backgroundColor: color, ...style }} className={`${styles.highlight} diorama-highlight ${className}`}>
    {children}
  </span>
);

export default Highlight;
