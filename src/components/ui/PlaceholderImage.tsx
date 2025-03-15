"use client";

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

type PlaceholderImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  fallbackSrc: string;
};

export default function PlaceholderImage({
  src,
  fallbackSrc,
  alt,
  ...props
}: PlaceholderImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only set the image source on the client side
    setImgSrc(src);
    setLoading(false);
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  // During server-side rendering or initial client load, show a placeholder
  if (loading) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${props.className || ''}`}
        style={props.style}
      />
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
