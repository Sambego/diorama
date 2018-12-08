import React from 'react';
import PropTypes from 'prop-types';

import style from './Navigation.css';

const Navigation = ({ onPreviousSlide, onNextSlide }) => (
  <nav className={`${style.navigation} diorama-navigation`}>
    <ul className={style.list}>
      <li className={style.item}>
        <button onClick={onPreviousSlide} className={`${style.previous} diorama-previous`}>
          Previous
        </button>
      </li>
      <li className={style.item}>
        <button onClick={onNextSlide} className={`${style.next} diorama-next`}>
          Next
        </button>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  onPreviousSlide: PropTypes.func.isRequired,
  onNextSlide: PropTypes.func.isRequired,
};

export default Navigation;
