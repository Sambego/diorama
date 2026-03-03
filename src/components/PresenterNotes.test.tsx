import React from 'react';
import { it, expect, describe, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import PresenterNotes from './PresenterNotes';

const slide = <div className="slide">Current slide</div>;
const nextSlide = <div className="slide">Next slide</div>;
const emptyStyles = document.querySelectorAll('nonexistent-selector');

it('renders correctly', () => {
  vi.useFakeTimers();
  const { container } = render(
    <PresenterNotes
      slide={slide}
      parentStyles={emptyStyles}
      origin="http://localhost"
      current={1}
      total={5}
    />,
  );
  expect(container).toMatchSnapshot();
  vi.useRealTimers();
});

describe('PresenterNotes props', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders notes when notes prop is provided', () => {
    vi.useFakeTimers();
    const { container } = render(
      <PresenterNotes
        slide={slide}
        notes="My speaker notes"
        parentStyles={emptyStyles}
        origin="http://localhost"
      />,
    );
    expect(container.querySelector('.diorama-presenter')).not.toBeNull();
  });

  it('renders next slide iframe when next prop is provided', () => {
    vi.useFakeTimers();
    const { getAllByTitle } = render(
      <PresenterNotes
        slide={slide}
        next={nextSlide}
        parentStyles={emptyStyles}
        origin="http://localhost"
      />,
    );
    const iframes = getAllByTitle(/slide/i);
    expect(iframes).toHaveLength(2);
  });
});
