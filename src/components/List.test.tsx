import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import List from './List';

it('renders correctly', () => {
  const { container } = render(
    <List>
      <li>one</li>
      <li>two</li>
    </List>,
  );
  expect(container).toMatchSnapshot();
});

describe('List props', () => {
  it('renders an <ol> when ordered prop is set', () => {
    const { container } = render(
      <List ordered>
        <li>one</li>
        <li>two</li>
      </List>,
    );
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ul')).toBeNull();
  });

  it('renders with a single child', () => {
    const { container } = render(
      <List>
        <li>only item</li>
      </List>,
    );
    expect(container.querySelectorAll('li')).toHaveLength(1);
  });
});
