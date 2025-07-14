import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './compras',
  publicDir: '../public',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
