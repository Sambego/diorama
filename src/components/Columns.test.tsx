import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Columns from './Columns';

it('renders correctly', () => {
  const { container } = render(
    <Columns>
      <div>Column 1</div>
      <div>Column 2</div>
    </Columns>,
  );
  expect(container).toMatchSnapshot();
});

describe('Columns props', () => {
  it('renders 3-column layout with correct max-width', () => {
    const { container } = render(
      <Columns>
        <div>Column 1</div>
        <div>Column 2</div>
        <div>Column 3</div>
      </Columns>,
    );
    const cols = container.querySelectorAll('.diorama-column');
    expect(cols).toHaveLength(3);
    cols.forEach(col => {
      expect((col as HTMLElement).style.maxWidth).toBe('33.333333333333336%');
    });
  });
});
