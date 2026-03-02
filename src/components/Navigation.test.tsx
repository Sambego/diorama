import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';

it('renders correctly', () => {
  const { container } = render(
    <Navigation onPreviousSlide={() => true} onNextSlide={() => true} />,
  );
  expect(container).toMatchSnapshot();
});
