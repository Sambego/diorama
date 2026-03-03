import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Text from './Text';

it('renders correctly', () => {
  const { container } = render(<Text>Text content</Text>);
  expect(container).toMatchSnapshot();
});

describe('Text props', () => {
  it('applies className prop', () => {
    const { container } = render(<Text className="custom-class">Text</Text>);
    expect(container.querySelector('p')).toHaveClass('custom-class');
  });

  it('applies style prop', () => {
    const { container } = render(<Text style={{ fontSize: '20px' }}>Text</Text>);
    expect(container.querySelector('p')).toHaveStyle({ fontSize: '20px' });
  });
});
