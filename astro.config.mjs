// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

const ghBase = '/homepage';
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
    prefetch: {
        // Prefetch navigation links immediately on page load
        prefetchAll: false,
        defaultStrategy: 'load',  // 'load' = prefetch immediately when page loads
    },
    vite: {
        plugins: vitePlugins,
    },
    build: {
        assets: 'assets',
    },
});
