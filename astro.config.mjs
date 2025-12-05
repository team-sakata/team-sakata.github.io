// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

const ghBase = '/';
const resolvedBase = process.env.ASTRO_BASE ?? ghBase;

const vitePlugins = [yaml()];

export default defineConfig({
    site: 'https://www.sakatalab.t.u-tokyo.ac.jp',
    base: resolvedBase,
    integrations: [sitemap()],
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
