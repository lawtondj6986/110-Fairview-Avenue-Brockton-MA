// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { generateOg } from './scripts/generate-og.mjs';

// Branded social cards are rendered before every build/dev session
await generateOg();

export default defineConfig({
  site: 'https://icsgroup.ai',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
