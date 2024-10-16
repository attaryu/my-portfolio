import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  name: "M Attar's Portfolio",
  short_name: 'M Attar',
  description:
    'My house in the entire internet universe. Where is the place for me to show my skills, works, experiments and creativity in the internet universe!',
  start_url: '/',
  display: 'fullscreen',
  background_color: '#ffffff',
  theme_color: '#000000',
  icons: [
    {
      src: '/favicon/web-app-manifest-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/web-app-manifest-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
});

export default manifest;
