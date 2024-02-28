import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();
import { generateSW } from 'workbox-build';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'FlappyProgger',
        short_name: 'FlappyProgger',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
	  workbox: {
        globDirectory: './dist',
        globPatterns: ['**/*.{html,js,css,png,jpg,svg,ico}'],
        swDest: './dist/sw.js',
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/vars.scss";
        `,
      },
    },
  },
});


