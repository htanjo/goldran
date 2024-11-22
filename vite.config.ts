import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    UnpluginInjectPreload({
      files: [{ entryMatch: /(logo|logo_flat).webp$/ }],
    }),
  ],
});
