import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';
import styles from './Code.css';

/* eslint-disable react/no-danger */
const Code = ({ code, lang }) => (
  <div className={styles.code}>
    <header className={styles.header}>
      <span className={styles.red} />
      <span className={styles.yellow} />
      <span className={styles.green} />
      <span className={styles.lang}>{lang}</span>
    </header>
    <div className={styles.snippet}>
      <pre>
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
  code: PropTypes.string.isRequired,
  lang: PropTypes.string,
};

Code.defaultProps = {
  lang: 'javascript',
};

export default Code;
