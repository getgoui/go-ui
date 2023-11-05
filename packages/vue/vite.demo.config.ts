import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // config so file can import from @ instead of import from 'src'
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('go-'),
        },
      },
    }),
  ],
});
