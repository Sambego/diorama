import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Slide from './Slide';

it('renders correctly', () => {
  const { container } = render(<Slide>Slide content</Slide>);
  expect(container).toMatchSnapshot();
});

describe('Slide props', () => {
  it('applies className prop', () => {
    const { container } = render(<Slide className="custom-slide">Content</Slide>);
    expect(container.firstElementChild).toHaveClass('custom-slide');
  });

  it('applies style prop', () => {
    const { container } = render(<Slide style={{ background: 'black' }}>Content</Slide>);
    expect(container.firstElementChild).toHaveStyle({ background: 'black' });
  });
});
