import React from 'react';
import { render } from '@testing-library/react';
import Text from './Text';

it('renders correctly', () => {
  const { container } = render(<Text>Text content</Text>);
  expect(container).toMatchSnapshot();
});
