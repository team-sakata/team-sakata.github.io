// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

const isGhPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
    site: isGhPages
        ? 'https://yourname.github.io'
        : 'http://localhost:4321',
    base: isGhPages ? '/my-astro-site/' : '/', // ← 本番だけサブディレクトリ
    vite: {
        plugins: [yaml()],
    },
});
