import React from 'react';
import { render } from '@testing-library/react';
import Browser from './Browser';

it('renders correctly', () => {
  const { container } = render(<Browser url="https://sambego.be" />);
  expect(container).toMatchSnapshot();
});
