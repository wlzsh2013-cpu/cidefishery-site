// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cidefishery.com',
  integrations: [],
  output: 'static',
  build: {
    assets: 'assets',
  },
  vite: {
    build: {
      cssMinify: false,
    },
  },
});
