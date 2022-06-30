import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
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
