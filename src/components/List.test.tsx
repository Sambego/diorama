import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

it('renders correctly', () => {
  const { container } = render(
    <List>
      <li>one</li>
      <li>two</li>
    </List>,
  );
  expect(container).toMatchSnapshot();
});
