'use client';

import React, { useState, useEffect, cloneElement } from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';

import style from './PresenterNotes.css';

const PresenterNotes = ({
  notes,
  slide,
  next,
  parentStyles,
  origin,
  current,
  total,
}) => {
  const [timerTotal, setTimerTotal] = useState(0);
  const [timer, setTimer] = useState('00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerTotal(prev => {
        const newTotal = prev + 1;
        const pad = n => (`${n}`.length > 1 ? `${n}` : `0${n}`);
        setTimer(
          `${pad(parseInt(newTotal / 3600, 10))}:${pad(parseInt(newTotal / 60, 10))}:${pad(
            newTotal % 60,
          )}`,
        );
        return newTotal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const injectOrigin = htmlString =>
    htmlString.replace(/src="([^"]*)"/gi, (match, media) => `src="${origin}${media}"`);

  const renderIframe = (title, content) => (
    <iframe
      title={title}
      srcDoc={injectOrigin(
        [...[...parentStyles].map(parentStyle => parentStyle.outerHTML), content].join(''),
      )}
      className={style.slide}
    />
  );

  const currentSlide = renderIframe(
    'current slide',
    renderToString(cloneElement(slide, { className: 'diorama-presenter-preview' })),
  );

  const nextSlide =
    next &&
    renderIframe(
      'next slide',
      renderToString(cloneElement(next, { className: 'diorama-presenter-preview' })),
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
};

PresenterNotes.propTypes = {
  notes: PropTypes.string,
  slide: PropTypes.node.isRequired,
  next: PropTypes.node,
  parentStyles: PropTypes.objectOf(PropTypes.any),
  origin: PropTypes.string.isRequired,
  current: PropTypes.number,
  total: PropTypes.number,
};

PresenterNotes.defaultProps = {
  notes: undefined,
  next: undefined,
  parentStyles: {},
  current: 1,
  total: 1,
};

export default PresenterNotes;
