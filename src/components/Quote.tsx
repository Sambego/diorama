import React from 'react';

import styles from './Quote.css';

export interface QuoteProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  quotee?: React.ReactNode;
}

const Quote = ({
  children, quotee, style = {}, className = '',
}: QuoteProps) => (
  <>
    <blockquote style={style} className={`${styles.quote} diorama-quote ${className}`}>
      {children}
    </blockquote>
    {quotee && <cite className={`${styles.cite} diorama-cite`}>{quotee}</cite>}
  </>
);

export default Quote;
