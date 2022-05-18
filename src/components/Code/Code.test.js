import React from 'react';
import renderer from 'react-test-renderer';
import Code from './Code';

it('renders correctly', () => {
  const tree = renderer.create(<Code code="const foo = () => 'bar';" />).toJSON();
  expect(tree).toMatchSnapshot();
});
