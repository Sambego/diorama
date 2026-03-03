import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Video from './Video';

it('renders correctly', () => {
  const { container } = render(<Video src="#" />);
  expect(container).toMatchSnapshot();
});

describe('Video props', () => {
  it('renders container element with full prop', () => {
    const { container } = render(<Video src="#" full />);
    expect(container.querySelector('video')).not.toBeNull();
  });

  it('renders color overlay when color prop provided', () => {
    const { container } = render(<Video src="#" color="#0000ff" />);
    const overlay = container.querySelector('.diorama-video-overlay') as HTMLElement;
    expect(overlay).not.toBeNull();
    expect(overlay.style.backgroundColor).toBe('rgb(0, 0, 255)');
  });

  it('renders with autoplay and loop props', () => {
    const { container } = render(<Video src="#" autoplay loop />);
    const video = container.querySelector('video') as HTMLVideoElement;
    expect(video.autoplay).toBe(true);
    expect(video.loop).toBe(true);
  });
});
