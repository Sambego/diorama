import React from 'react';

import styles from './Subtitle.css';

export interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Subtitle = ({ children, style = {}, className = '' }: SubtitleProps) => (
  <h2 style={style} className={`${styles.subtitle} diorama-subtitle ${className}`}>
    {children}
  </h2>
);

export default Subtitle;
