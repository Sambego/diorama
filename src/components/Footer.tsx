import React from 'react';

import styles from './Footer.css';

export interface FooterProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Footer = ({
  left, right, style = {}, className = '',
}: FooterProps) => (
  <footer style={style} className={`${styles.footer} diorama-footer ${className}`}>
    {left && <div className={`${styles.left} diorama-footer-left`}>{left}</div>}
    {right && <div className={`${styles.right} diorama-footer-right`}>{right}</div>}
  </footer>
);

export default Footer;
