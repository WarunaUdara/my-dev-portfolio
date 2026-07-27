import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
}

export default function Image({
  src,
  alt,
  fill,
  priority,
  unoptimized,
  quality,
  className = '',
  style,
  width,
  height,
  ...props
}: ImageProps) {
  const combinedStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        inset: 0,
        objectFit: 'cover',
        ...style,
      }
    : { ...style };

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={combinedStyle}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
}
