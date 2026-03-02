import React from 'react';
import { render } from '@testing-library/react';
import Code from './Code';

it('renders correctly', () => {
  const { container } = render(<Code code="const foo = () => 'bar';" />);
  expect(container).toMatchSnapshot();
});
