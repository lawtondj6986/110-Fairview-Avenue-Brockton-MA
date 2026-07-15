// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: change `site` to the production domain once purchased
export default defineConfig({
  site: 'https://innovativecommercialstrategies.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
