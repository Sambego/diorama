import React from 'react';
import { render } from '@testing-library/react';
import Title from './Title';

it('renders correctly', () => {
  const { container } = render(<Title>Title content</Title>);
  expect(container).toMatchSnapshot();
});
