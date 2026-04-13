import React from 'react';

import styles from './Browser.css';

export interface BrowserProps {
  className?: string;
  url?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Browser = ({ style = {}, className = '', url, children }: BrowserProps) => (
  <div style={style} className={`${styles.browser} diorama-browser ${className}`}>
    <header className={styles.header}>
      <div className={styles.traffic}>
        <span className={styles.red} />
        <span className={styles.yellow} />
        <span className={styles.green} />
      </div>
      <input className={styles.address} type="text" value={url} disabled />
    </header>
    {url ?? <iframe src={url} frameBorder="0" title="preview browser" className={styles.iframe} />}
    {children ?? children}
  </div>
);

export default Browser;
