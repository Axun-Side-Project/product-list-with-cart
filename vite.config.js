import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

const mode = 'production';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: mode === 'production' ? 'https://axun-side-project.github.io/product-list-with-cart' : './',
})
