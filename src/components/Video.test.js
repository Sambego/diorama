import React from 'react';
import renderer from 'react-test-renderer';
import Video from './Video';

it('renders correctly', () => {
  const tree = renderer.create(<Video src="#" />).toJSON();
  expect(tree).toMatchSnapshot();
});
