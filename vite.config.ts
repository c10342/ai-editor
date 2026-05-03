import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
