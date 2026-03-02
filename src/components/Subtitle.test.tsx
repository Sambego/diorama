import React from 'react';
import { render } from '@testing-library/react';
import Subtitle from './Subtitle';

it('renders correctly', () => {
  const { container } = render(<Subtitle>Subtitle content</Subtitle>);
  expect(container).toMatchSnapshot();
});
