import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [require('@vitejs/plugin-vue')()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/components/__test__/setup.js']
    },
    devServer: {
      proxy: {
        '/api/*': {
          target: "http://[::1]:42069/",
          ws: true,
          changeOrigin: true,
          secure: false
        }
      }
    },
  });
