import React from 'react';
import classnames from 'classnames';
import styles from './Video.css';

export interface VideoProps {
  autoplay?: boolean;
  loop?: boolean;
  full?: boolean;
  color?: string;
  style?: React.CSSProperties;
  src: string;
  className?: string;
}

const Video = ({
  src, color, full = false, autoplay = false, loop = false, style = {}, className = '',
}: VideoProps) => {
  const classes = classnames(
    styles.video,
    {
      [styles.full]: full,
    },
    className,
    'diorama-video-container',
  );

  return (
    <div className={classes} style={style}>
      <video src={src} autoPlay={autoplay} loop={loop} muted className="diorama-video-player" />
      {color ? (
        <div
          className={`${styles.overlay} diorama-video-overlay`}
          style={{
            backgroundColor: color,
          }}
        />
      ) : null}
    </div>
  );
};

export default Video;
