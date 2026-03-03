import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Footer from './Footer';

it('renders correctly', () => {
  const { container } = render(<Footer left="@sambego" />);
  expect(container).toMatchSnapshot();
});

describe('Footer props', () => {
  it('renders right prop only', () => {
    const { container } = render(<Footer right="slide 1/10" />);
    expect(container.querySelector('.diorama-footer-right')).toHaveTextContent('slide 1/10');
    expect(container.querySelector('.diorama-footer-left')).toBeNull();
  });

  it('renders both left and right props', () => {
    const { container } = render(<Footer left="@sambego" right="slide 1/10" />);
    expect(container.querySelector('.diorama-footer-left')).toHaveTextContent('@sambego');
    expect(container.querySelector('.diorama-footer-right')).toHaveTextContent('slide 1/10');
  });
});
