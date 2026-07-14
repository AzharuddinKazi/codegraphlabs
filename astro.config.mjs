import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [react(), mdx()],
  output: 'static',
  adapter: vercel()
});
