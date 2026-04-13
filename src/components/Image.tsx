import React from 'react';
import classnames from 'classnames';
import styles from './Image.css';

export interface ImageProps {
  alt: string;
  color?: string;
  className?: string;
  contain?: boolean;
  full?: boolean;
  fullBg?: boolean;
  style?: React.CSSProperties;
  src: string;
}

const Image = ({
  alt, src, style = {}, full = false, fullBg = false, color, className = '', contain = false,
}: ImageProps) => {
  const containerClasses = classnames(
    styles.container,
    {
      [styles.full]: full,
      [styles['full-bg']]: fullBg,
    },
    'diorama-image-container',
  );
  const imageClasses = classnames(
    styles.image,
    {
      [styles.full]: full,
      [styles.contain]: contain,
      [className]: className !== '',
    },
    'diorama-image',
  );

  return (
    <div className={containerClasses}>
      {color && (
        <div
          className={`${styles.overlay} diorama-image-overlay`}
          style={{ backgroundColor: color }}
        />
      )}
      <img className={imageClasses} src={src} style={style} alt={alt} />
    </div>
  );
};

export default Image;
