import React from 'react';

import styles from './Slide.css';

export interface SlideProps {
  children: React.ReactNode;
  className?: string;
  notes?: string;
  style?: React.CSSProperties;
}

const Slide = ({ children, style = {}, className = '' }: SlideProps) => (
  <div style={style} className={`${styles.slide} diorama-slide ${className}`}>
    <div className={`diorama-content ${styles.content}`}>{children}</div>
  </div>
);

export default Slide;
