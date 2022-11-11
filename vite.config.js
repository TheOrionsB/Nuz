import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [vue()],
    test: {
      environment: 'happy-dom'
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