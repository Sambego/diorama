import React from 'react';
import { render } from '@testing-library/react';
import Video from './Video';

it('renders correctly', () => {
  const { container } = render(<Video src="#" />);
  expect(container).toMatchSnapshot();
});
