import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import styles from './Slide.css';

const Slide = ({
  children, style, className, note, navigate, index,
}) => {
  if (note) {
    /* eslint-disable no-console */
    console.log('----------------------------------------------------------------');
    console.log(`Note ${index + 1}: ${note}`);
    console.log('----------------------------------------------------------------');
    /* eslint-enable no-console */
  }

  return (
    <div style={style} className={`${styles.slide} diorama-slide ${className}`}>
      {cloneElement(children, {
        navigate,
      })}
    </div>
  );
};

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  index: PropTypes.number,
  navigate: PropTypes.func,
  note: PropTypes.string,
  style: PropTypes.shape({}),
};

Slide.defaultProps = {
  className: '',
  index: 0,
  navigate: () => true,
  note: undefined,
  style: {},
};

export default Slide;
