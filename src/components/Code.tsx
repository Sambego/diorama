'use client';

import React from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';
import styles from './Code.css';

export interface CodeProps {
  className?: string;
  code: string;
  lang?: string;
  style?: React.CSSProperties;
}

/* eslint-disable react/no-danger */
const Code = ({
  code, lang = 'javascript', style = {}, className = '',
}: CodeProps) => (
  <div className={`${styles.code} diorama-code ${className}`} style={style}>
    <header className={`${styles.header} diorama-code-header`}>
      <span className={styles.red} />
      <span className={styles.yellow} />
      <span className={styles.green} />
      <span className={styles.lang}>{lang}</span>
    </header>
    <div className={`${styles.snippet} diorama-code-snippet`}>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(code, Prism.languages[lang], lang),
          }}
        />
      </pre>
    </div>
  </div>
);
/* eslint-enable react/no-danger */

export default Code;
