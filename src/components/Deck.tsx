'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  cloneElement,
} from 'react';
import { createRoot, Root } from 'react-dom/client';
import Keyboard from '../services/Keyboard';
import Navigation from './Navigation';
import PresenterNotes from './PresenterNotes';

import styles from './Deck.css';
import '../styles/styles.css';

export interface DeckProps {
  children: React.ReactElement<{ notes?: string; className?: string; index?: number; navigate?: (id: number) => void }>[];
  className?: string;
  footer?: React.ReactNode;
  navigation?: boolean;
  swipeToChange?: boolean;
  presenterNotes?: boolean;
}

const Deck = ({
  children,
  className = '',
  footer,
  navigation = false,
  swipeToChange = true,
  presenterNotes = false,
}: DeckProps) => {
  const [slide, setSlide] = useState(
    () => {
      if (typeof window === 'undefined' || !window.location) return 0;
      return Number(window.location.hash.replace('#', '')) || 0;
    },
  );

  const presenterWindowRef = useRef<Window | null>(null);
  const presenterRootRef = useRef<Root | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const initialSlideRef = useRef(slide);

  const buildPresenterElement = useCallback(
    (currentSlide: number, mainStyles: NodeListOf<Element>) => (
      <PresenterNotes
        slide={children[currentSlide]}
        next={children[currentSlide + 1]}
        notes={children[currentSlide].props.notes}
        current={currentSlide + 1}
        total={children.length}
        parentStyles={mainStyles}
        origin={`${window.location.protocol}//${window.location.hostname}${
          window.location.port ? `:${window.location.port}` : ''
        }`}
      />
    ),
    [children],
  );

  useEffect(() => {
    window.location.hash = String(slide);
  }, [slide]);

  const getPreviousSlide = useCallback(() => {
    setSlide(current => {
      if (current === 0) return current;
      return current - 1;
    });
  }, []);

  const getNextSlide = useCallback(() => {
    setSlide(current => {
      if (current === children.length - 1) return current;
      return current + 1;
    });
  }, [children.length]);

  const getSlide = useCallback((slideId: number) => {
    setSlide(slideId);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const leftListener = Keyboard.on('left', getPreviousSlide);
    const rightListener = Keyboard.on('right', getNextSlide);
    const upListener = Keyboard.on('page up', getPreviousSlide);
    const downListener = Keyboard.on('page down', getNextSlide);

    return () => {
      Keyboard.off(leftListener);
      Keyboard.off(rightListener);
      Keyboard.off(upListener);
      Keyboard.off(downListener);
    };
  }, [getPreviousSlide, getNextSlide]);

  // Open presenter notes popup on mount
  useEffect(() => {
    if (!presenterNotes) return;

    const win = window.open(
      '',
      'Presenter notes',
      'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,width=1000,height=600',
    );

    if (!win || win.closed) {
      /* eslint-disable no-alert */
      window.alert('Please allow popups to open the presenter window.');
      /* eslint-enable no-alert */
      return;
    }

    presenterWindowRef.current = win;

    const container = win.document.createElement('div');
    const mainStyles = document.querySelectorAll('link[type="text/css"], style');

    presenterRootRef.current = createRoot(container);
    presenterRootRef.current.render(buildPresenterElement(initialSlideRef.current, mainStyles));

    win.document.title = `[ Presenter notes - slide ${initialSlideRef.current + 1}/${
      children.length
    } ] - ${document.title}`;

    [].forEach.call(mainStyles, (s: Element) => {
      win.document.head.innerHTML += s.outerHTML;
    });

    win.document.body.append(container);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update presenter notes when slide changes
  useEffect(() => {
    if (!presenterRootRef.current || !presenterWindowRef.current) return;

    const mainStyles = document.querySelectorAll('link[type="text/css"], style');
    presenterRootRef.current.render(buildPresenterElement(slide, mainStyles));

    presenterWindowRef.current.document.title = `[ Presenter notes - slide ${slide + 1}/${
      children.length
    } ] - ${document.title}`;
  }, [slide, children.length, buildPresenterElement]);

  // Native swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (touchStartXRef.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartXRef.current;
      touchStartXRef.current = null;
      if (Math.abs(dx) < 30) return;
      if (dx < 0) getNextSlide();
      else getPreviousSlide();
    },
    [getNextSlide, getPreviousSlide],
  );

  return (
    <div
      className={`diorama-swipe-container ${styles.swipe}`}
      onTouchStart={swipeToChange ? handleTouchStart : undefined}
      onTouchEnd={swipeToChange ? handleTouchEnd : undefined}
    >
      <div className={`diorama diorama-deck ${styles.deck} ${className}`}>
        {footer && footer}
        {navigation && (
          <Navigation onPreviousSlide={getPreviousSlide} onNextSlide={getNextSlide} />
        )}
        {cloneElement(children[slide], {
          index: slide,
          navigate: getSlide,
        })}
      </div>
    </div>
  );
};

export default Deck;
