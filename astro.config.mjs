// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wlzsh2013-cpu.github.io',
  integrations: [sitemap()],
  base: '/cidefishery-site/',
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