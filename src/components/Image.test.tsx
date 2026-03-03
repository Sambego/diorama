import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Image from './Image';

it('renders correctly', () => {
  const { container } = render(<Image src="test.png" alt="image description" />);
  expect(container).toMatchSnapshot();
});

describe('Image props', () => {
  it('renders img element with full prop', () => {
    const { container } = render(<Image src="test.png" alt="image" full />);
    expect(container.querySelector('img')).not.toBeNull();
  });

  it('renders img element with contain prop', () => {
    const { container } = render(<Image src="test.png" alt="image" contain />);
    expect(container.querySelector('img')).not.toBeNull();
  });

  it('renders color overlay when color prop provided', () => {
    const { container } = render(<Image src="test.png" alt="image" color="#ff0000" />);
    const overlay = container.querySelector('.diorama-image-overlay') as HTMLElement;
    expect(overlay).not.toBeNull();
    expect(overlay.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});
