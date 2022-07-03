import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
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
    emptyOutDir: true,
    target: 'es2015',
    outDir: './dist',
    lib: {
      entry: 'src/index.tsx',
      name: 'reactive-mjml',
      formats: ['es'],
    },
  },
});
