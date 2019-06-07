import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import style from './PresenterNotes.css';

export default class PresenterNotes extends Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    notes: PropTypes.string,
    slide: PropTypes.node.isRequired,
    next: PropTypes.node,
  };
  /* eslint-enable react/no-unused-prop-types */

  static defaultProps = {
    notes: undefined,
    next: undefined,
  };

  static calculateScale() {
    const baseWidth = 1000;
    const miniatureWidth = 400;

    return `${1 / (baseWidth / miniatureWidth)}`;
  }

  constructor(props) {
    super(props);

    this.state = { timerTotal: 0, timer: '00:00:00', ...this.props };
    this.updateTimer = ::this.updateTimer;
  }

  componentDidMount() {
    window.setInterval(this.updateTimer, 1000);
  }

  componentDidUpdate() {
    const images = document.querySelectorAll('img');

    [].forEach.call(images, (image) => {
      if (image.src.indexOf('://')) {
        return;
      }

      image.src = `http://localhost:3000${image.src}`; // eslint-disable-line no-param-reassign
    });
  }

  updateTimer() {
    const { timerTotal } = this.state;
    const pad = toPad => (`${toPad}`.length > 1 ? `${toPad}` : `0${toPad}`);

    this.setState(state => ({
      ...state,
      timerTotal: timerTotal + 1,
      timer: `${pad(parseInt(timerTotal / 3600, 10))}:${pad(parseInt(timerTotal / 60, 10))}:${pad(
        timerTotal % 60,
      )}`,
    }));
  }

  render() {
    const {
      slide, next, notes, current, total, timer,
    } = this.state;

    return (
      <div className={`${style.presenter} diorama-presenter`}>
        <div className={style.slides}>
          <div className={style.slide}>
            {cloneElement(slide, {
              className: style.miniature,
              scale: PresenterNotes.calculateScale(),
            })}
          </div>
          {next && (
            <div className={style.next}>
              {cloneElement(next, {
                className: style.miniature,
                scale: PresenterNotes.calculateScale(),
              })}
            </div>
          )}
        </div>
        <div className={style.notes}>{notes && notes}</div>
        <div className={style.meta}>
          <span>{timer}</span>
          <span>
            {current}
            /
            {total}
          </span>
        </div>
      </div>
    );
  }
}
