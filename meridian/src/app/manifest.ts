import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meridian Immigration Group',
    short_name: 'Meridian',
    description: 'Immigration help in Brockton, MA. Emergency guide works offline.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F7F3EA',
    theme_color: '#14284B',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
