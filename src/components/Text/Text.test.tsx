import React from 'react';
import renderer from 'react-test-renderer';
import Text from ".";

it('renders correctly', () => {
  const tree = renderer.create(<Text>Text content</Text>).toJSON();
  expect(tree).toMatchSnapshot();
});
