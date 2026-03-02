import React from 'react';
import { render } from '@testing-library/react';
import Deck from './Deck';

it('renders correctly', () => {
  const { container } = render(
    <Deck>
      <div>Slide 1</div>
      <div>Slide 2</div>
    </Deck>,
  );
  expect(container).toMatchSnapshot();
});
