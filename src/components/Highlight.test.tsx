import React from 'react';
import { render } from '@testing-library/react';
import Highlight from './Highlight';

it('renders correctly', () => {
  const { container } = render(<Highlight>Highlighted text</Highlight>);
  expect(container).toMatchSnapshot();
});
