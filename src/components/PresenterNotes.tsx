'use client';

import React, { useState, useEffect, cloneElement } from 'react';
import { renderToString } from 'react-dom/server';

import style from './PresenterNotes.css';

export interface PresenterNotesProps {
  notes?: string;
  slide: React.ReactElement<{ className?: string }>;
  next?: React.ReactElement<{ className?: string }>;
  parentStyles: NodeListOf<Element> | Record<string, never>;
  origin: string;
  current?: number;
  total?: number;
}

const PresenterNotes = ({
  notes,
  slide,
  next,
  parentStyles = {},
  origin,
  current = 1,
  total = 1,
}: PresenterNotesProps) => {
  const [, setTimerTotal] = useState(0);
  const [timer, setTimer] = useState('00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerTotal(prev => {
        const newTotal = prev + 1;
        const pad = (n: number) => (`${n}`.length > 1 ? `${n}` : `0${n}`);
        setTimer(
          `${pad(parseInt(String(newTotal / 3600), 10))}:${pad(parseInt(String(newTotal / 60), 10))}:${pad(
            newTotal % 60,
          )}`,
        );
        return newTotal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const injectOrigin = (htmlString: string) =>
    htmlString.replace(/src="([^"]*)"/gi, (_match: string, media: string) => `src="${origin}${media}"`);

  const renderIframe = (title: string, content: string) => (
    <iframe
      title={title}
      srcDoc={injectOrigin(
        [...[...(parentStyles as NodeListOf<Element>)].map((parentStyle: Element) => parentStyle.outerHTML), content].join(''),
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

export default PresenterNotes;
