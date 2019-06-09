import React, { Component, cloneElement } from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';

import style from './PresenterNotes.css';

export default class PresenterNotes extends Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    notes: PropTypes.string,
    slide: PropTypes.node.isRequired,
    next: PropTypes.node,
    parentStyles: PropTypes.objectOf(PropTypes.any),
    origin: PropTypes.string.isRequired,
  };
  /* eslint-enable react/no-unused-prop-types */

  static defaultProps = {
    notes: undefined,
    next: undefined,
    parentStyles: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);

    this.state = { timerTotal: 0, timer: '00:00:00', ...this.props };
    this.updateTimer = ::this.updateTimer;
  }

  componentDidMount() {
    window.setInterval(this.updateTimer, 1000);
  }

  injectOrigin(htmlString) {
    const { origin } = this.props;
    return htmlString.replace(/src="([^"]*)"/gi, (match, media) => `src="${origin}${media}"`);
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

  renderIframe(title, content) {
    const { parentStyles } = this.props;

    return (
      <iframe
        title={title}
        srcDoc={this.injectOrigin(
          [...[...parentStyles].map(parentStyle => parentStyle.outerHTML), content].join(''),
        )}
        className={style.slide}
      />
    );
  }

  render() {
    const {
      slide, next, notes, current, total, timer,
    } = this.state;
    const currentSlide = this.renderIframe(
      'current slide',
      renderToString(
        cloneElement(slide, {
          className: 'diorama-presenter-preview',
        }),
      ),
    );
    const nextSlide = this.renderIframe(
      'next slide',
      renderToString(
        cloneElement(next, {
          className: 'diorama-presenter-preview',
        }),
      ),
    );

    return (
      <div className={`${style.presenter} diorama-presenter`}>
        <div className={style.slides}>
          {currentSlide}
          {next && nextSlide}
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
