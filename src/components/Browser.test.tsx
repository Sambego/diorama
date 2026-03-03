import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Browser from './Browser';

it('renders correctly', () => {
  const { container } = render(<Browser url="https://sambego.be" />);
  expect(container).toMatchSnapshot();
});

describe('Browser props', () => {
  it('applies className prop', () => {
    const { container } = render(<Browser url="https://sambego.be" className="custom-class" />);
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  it('applies style prop', () => {
    const { container } = render(
      <Browser url="https://sambego.be" style={{ opacity: 0.5 }} />,
    );
    expect(container.firstElementChild).toHaveStyle({ opacity: '0.5' });
  });
});
