import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Subtitle from './Subtitle';

it('renders correctly', () => {
  const { container } = render(<Subtitle>Subtitle content</Subtitle>);
  expect(container).toMatchSnapshot();
});

describe('Subtitle props', () => {
  it('applies className prop', () => {
    const { container } = render(<Subtitle className="custom-class">Subtitle</Subtitle>);
    expect(container.querySelector('h2')).toHaveClass('custom-class');
  });

  it('applies style prop', () => {
    const { container } = render(<Subtitle style={{ color: 'blue' }}>Subtitle</Subtitle>);
    expect(container.querySelector('h2')).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });
});
