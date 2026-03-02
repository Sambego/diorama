import React from 'react';
import { render } from '@testing-library/react';
import Slide from './Slide';

it('renders correctly', () => {
  const { container } = render(<Slide>Slide content</Slide>);
  expect(container).toMatchSnapshot();
});
