import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages hosts at /my-portfolio/ — relative base keeps assets loading
  base: './',
  plugins: [react()],
  server: {},
  preview: {
    allowedHosts: true,
  },
});