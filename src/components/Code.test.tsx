import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Code from './Code';

it('renders correctly', () => {
  const { container } = render(<Code code="const foo = () => 'bar';" />);
  expect(container).toMatchSnapshot();
});

describe('Code props', () => {
  it('renders lang name in header when lang="css" provided', () => {
    const { getByText } = render(<Code code=".foo { color: red; }" lang="css" />);
    expect(getByText('css')).not.toBeNull();
  });
});
