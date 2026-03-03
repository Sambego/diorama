import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Deck from './Deck';
import Slide from './Slide';
import Footer from './Footer';

it('renders correctly', () => {
  const { container } = render(
    <Deck>
      <div>Slide 1</div>
      <div>Slide 2</div>
    </Deck>,
  );
  expect(container).toMatchSnapshot();
});

describe('Deck props', () => {
  it('renders navigation when navigation prop is true', () => {
    const { container } = render(
      <Deck navigation>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
      </Deck>,
    );
    expect(container.querySelector('.diorama-navigation')).not.toBeNull();
  });

  it('renders footer when footer prop is provided', () => {
    const { container } = render(
      <Deck footer={<Footer left="@sambego" />}>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
      </Deck>,
    );
    expect(container.querySelector('.diorama-footer')).not.toBeNull();
  });
});
