import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

it('renders correctly', () => {
  const { container } = render(<Footer left="@sambego" />);
  expect(container).toMatchSnapshot();
});
