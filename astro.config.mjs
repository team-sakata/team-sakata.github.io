// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

const ghBase = '/sklab_homepage';
const resolvedBase = process.env.ASTRO_BASE ?? ghBase;

const vitePlugins = [yaml()];

export default defineConfig({
    site: 'https://asatani.github.io',
    base: resolvedBase,
    i18n: {
        defaultLocale: 'ja',
        locales: ['ja', 'en'],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: false,
        },
    },
    vite: {
        plugins: vitePlugins,
    },
    build: {
        assets: 'assets',
    },
});
