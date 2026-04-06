import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 70,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            if (id.includes('src/components/ui/')) {
              return 'ui-components';
            }
            return;
          }

          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'react-vendor';
          }

          if (id.includes('react-router-dom') || id.includes('@tanstack/react-query')) {
            return 'app-core';
          }

          if (id.includes('@emotion')) {
            return 'emotion';
          }

          if (id.includes('react-toastify')) {
            return 'toast';
          }

          if (id.includes('lottie-web')) {
            return 'lottie';
          }

          if (id.includes('fullpage.js') || id.includes('lottie-react')) {
            return 'motion';
          }
        },
      },
    },
  },
  server: {
    host: true, // 또는 '0.0.0.0'
    port: 5173,
  },
})
