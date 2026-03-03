import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Title from './Title';

it('renders correctly', () => {
  const { container } = render(<Title>Title content</Title>);
  expect(container).toMatchSnapshot();
});

describe('Title props', () => {
  it('applies className prop', () => {
    const { container } = render(<Title className="custom-class">Title</Title>);
    expect(container.querySelector('h1')).toHaveClass('custom-class');
  });

  it('applies style prop', () => {
    const { container } = render(<Title style={{ color: 'red' }}>Title</Title>);
    expect(container.querySelector('h1')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
});
