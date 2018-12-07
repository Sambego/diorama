import React from 'react';
import renderer from 'react-test-renderer';
import Image from './Image';

import test from '../../__mocks__/test.png';

it('renders correctly', () => {
  const tree = renderer.create(<Image src={test} alt="image description" />).toJSON();
  expect(tree).toMatchSnapshot();
});
