import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Quote from './Quote';

it('renders correctly', () => {
  const { container } = render(<Quote quotee="Sam Bellen">Nice quote</Quote>);
  expect(container).toMatchSnapshot();
});

describe('Quote props', () => {
  it('renders without quotee prop', () => {
    const { container } = render(<Quote>Quote without attribution</Quote>);
    expect(container.querySelector('cite')).toBeNull();
  });
});
