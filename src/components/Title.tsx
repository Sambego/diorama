import React from 'react';

import styles from './Title.css';

export interface TitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Title = ({ children, style = {}, className = '' }: TitleProps) => (
  <h1 style={style} className={`${styles.title} diorama-title ${className}`}>
    {children}
  </h1>
);

export default Title;
