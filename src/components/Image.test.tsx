import React from 'react';
import { render } from '@testing-library/react';
import Image from './Image';

import test from '../../__mocks__/test.png';

it('renders correctly', () => {
  const { container } = render(<Image src={test} alt="image description" />);
  expect(container).toMatchSnapshot();
});
