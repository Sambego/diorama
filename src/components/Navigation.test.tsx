import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';

it('renders correctly', () => {
  const { container } = render(
    <Navigation onPreviousSlide={() => true} onNextSlide={() => true} />,
  );
  expect(container).toMatchSnapshot();
});

describe('Navigation interactions', () => {
  it('calls onPreviousSlide when Previous button is clicked', () => {
    const onPrevious = vi.fn();
    const { getByText } = render(
      <Navigation onPreviousSlide={onPrevious} onNextSlide={() => {}} />,
    );
    fireEvent.click(getByText('Previous'));
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it('calls onNextSlide when Next button is clicked', () => {
    const onNext = vi.fn();
    const { getByText } = render(
      <Navigation onPreviousSlide={() => {}} onNextSlide={onNext} />,
    );
    fireEvent.click(getByText('Next'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
