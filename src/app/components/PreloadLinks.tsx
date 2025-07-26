import type { Metadata } from 'next';

export function generatePreloadMetadata(imagePaths: string[]): Metadata {
  return {
    other: {
      ...imagePaths.reduce((acc, path, index) => ({
        ...acc,
        [`preload-${index}`]: {
          rel: 'preload',
          href: path,
          as: 'image',
          crossOrigin: 'anonymous'
        }
      }), {})
    }
  };
}