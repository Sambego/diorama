import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';
import styles from './Code.css';

/* eslint-disable react/no-danger */
const Code = ({
  code, lang, lines, style, className,
}) => (
  <div className={`${styles.code} diorama-code ${className}`} style={style}>
    <header className={styles.header}>
      <span className={styles.red} />
      <span className={styles.yellow} />
      <span className={styles.green} />
      <span className={styles.lang}>{lang}</span>
    </header>
    <div className={styles.snippet}>
      <pre data-line={lines}>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(code, Prism.languages[lang], Prism.languages[lang]),
          }}
        />
      </pre>
    </div>
  </div>
);
/* eslint-enable react/no-danger */

Code.propTypes = {
  className: PropTypes.string,
  code: PropTypes.string.isRequired,
  lines: PropTypes.string,
  lang: PropTypes.string,
  style: PropTypes.shape({}),
};

Code.defaultProps = {
  className: '',
  lang: 'javascript',
  style: {},
  lines: '',
};

export default Code;
