import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Highlight from './Highlight';

it('renders correctly', () => {
  const { container } = render(<Highlight>Highlighted text</Highlight>);
  expect(container).toMatchSnapshot();
});

describe('Highlight props', () => {
  it('applies color prop as background', () => {
    const { container } = render(<Highlight color="#ff0000">Highlighted text</Highlight>);
    expect(container.querySelector('span')).toHaveStyle({ backgroundColor: '#ff0000' });
  });
});
