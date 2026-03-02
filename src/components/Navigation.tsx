'use client';

import React from 'react';

import styles from './Navigation.css';

export interface NavigationProps {
  className?: string;
  onPreviousSlide: () => void;
  onNextSlide: () => void;
  style?: React.CSSProperties;
}

const Navigation = ({
  onPreviousSlide, onNextSlide, className = '', style = {},
}: NavigationProps) => (
  <nav className={`${styles.navigation} diorama-navigation ${className}`} style={style}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <button
          onClick={onPreviousSlide}
          className={`${styles.previous} diorama-previous`}
          type="button"
        >
          Previous
        </button>
      </li>
      <li className={styles.item}>
        <button onClick={onNextSlide} className={`${styles.next} diorama-next`} type="button">
          Next
        </button>
      </li>
    </ul>
  </nav>
);

export default Navigation;
