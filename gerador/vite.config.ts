import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/gerador-de-proposta/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@types': resolve(__dirname, 'src/types'),
      '@config': resolve(__dirname, 'src/config'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@templates': resolve(__dirname, 'src/templates'),
      '@generators': resolve(__dirname, 'src/generators'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        recibo: resolve(__dirname, 'recibo.html'),
      },
    },
  },
  server: {
    port: 5174,
    open: '/login.html',
  },
});
