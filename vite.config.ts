import { defineConfig } from 'vite';
import path from 'path';
import { resolve } from 'path';

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
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AiEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => `ai-editor.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [/^@tiptap/],
      output: {
        globals: {
          '@tiptap/core': 'TiptapCore',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((n) => n.endsWith('.css'))) {
            return 'ai-editor.css';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
  },
});
