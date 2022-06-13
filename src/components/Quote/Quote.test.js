import React from 'react';
import renderer from 'react-test-renderer';
import Quote from './Quote';

it('renders correctly', () => {
  const tree = renderer.create(<Quote quotee="Sam Bellen">Nice quote</Quote>).toJSON();
  expect(tree).toMatchSnapshot();
});
