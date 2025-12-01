// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

const isGhPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
    site: 'https://asatani.github.io',
    base: '/sklab_homepage',
    vite: {
        plugins: [yaml()],
    },
    build: {
        assets: 'assets',
    },
});
