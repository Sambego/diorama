import React from 'react';
import { render } from '@testing-library/react';
import Columns from './Columns';

it('renders correctly', () => {
  const { container } = render(
    <Columns>
      <div>Column 1</div>
      <div>Column 2</div>
    </Columns>,
  );
  expect(container).toMatchSnapshot();
});
