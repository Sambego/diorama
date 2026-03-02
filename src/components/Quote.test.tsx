import React from 'react';
import { render } from '@testing-library/react';
import Quote from './Quote';

it('renders correctly', () => {
  const { container } = render(<Quote quotee="Sam Bellen">Nice quote</Quote>);
  expect(container).toMatchSnapshot();
});
