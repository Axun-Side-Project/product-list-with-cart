import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const mode = 'production';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs',
  },
  base: mode === 'production' ? 'https://axun-side-project.github.io/product-list-with-cart' : '/',
})
