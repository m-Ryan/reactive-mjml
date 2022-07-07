import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      lodash: 'lodash-es',
      mjml: 'mjml-browser',
    },
  },
  define: {
    'process.env': JSON.stringify({
      ...process.env,
    }),
  },
  esbuild: {
    jsxInject: "import React from 'react';",
  },
  css: {},

  build: {
    minify: true,
    emptyOutDir: true,
    target: 'es2015',
    outDir: './lib',
    lib: {
      entry: 'src/index.tsx',
      name: 'reactive-mjml',
      formats: ['es'],
      fileName: mod => `index.js`,
    },
    rollupOptions: {
      plugins: [visualizer()],
      external: ['react', 'react-dom', 'react-dom/server', 'mjml-browser'],
      output: {},
    },
  },
});
