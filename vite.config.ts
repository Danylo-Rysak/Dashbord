import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'store',
        replacement: fileURLToPath(new URL('./src/store', import.meta.url)),
      },
    ],
  },
});
