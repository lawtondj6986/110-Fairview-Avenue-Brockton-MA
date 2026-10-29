// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { generateOg } from './scripts/generate-og.mjs';
import { generateLlmsFull } from './scripts/generate-llms-full.mjs';
import { generateAnswers } from './scripts/generate-answers.mjs';

// Branded social cards are rendered before every build/dev session
await generateOg();

/** After the static build, emit /llms-full.txt from the finished HTML. */
const llmsFull = {
  name: 'ics-llms-full',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const { pages, bytes } = generateLlmsFull(fileURLToPath(dir));
      logger.info(`llms-full.txt: ${pages} pages, ${(bytes / 1024).toFixed(0)} KB`);
      const a = generateAnswers(fileURLToPath(dir));
      logger.info(`answers-index.json: ${a.answers} answers, ${(a.bytes / 1024).toFixed(0)} KB`);
    },
  },
};

export default defineConfig({
  site: 'https://icsgroup.ai',
  integrations: [sitemap({ filter: (page) => !page.includes('/shipped/') }), llmsFull],
  // The founder's name is a brand: a clean URL for it resolves to the bio.
  redirects: { '/daniel-lawton/': '/about/', '/founder/': '/about/' },
  vite: {
    plugins: [tailwindcss()],
  },
});
