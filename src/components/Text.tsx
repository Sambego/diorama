import React from 'react';

import styles from './Text.css';

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Text = ({ children, style = {}, className = '' }: TextProps) => (
  <p style={style} className={`${styles.text} diorama-text ${className}`}>
    {children}
  </p>
);

export default Text;
