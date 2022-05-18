import React from 'react';
import renderer from 'react-test-renderer';
import Slide from './Slide';

it('renders correctly', () => {
  const tree = renderer.create(<Slide>Slide content</Slide>).toJSON();
  expect(tree).toMatchSnapshot();
});
