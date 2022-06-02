import { defineConfig } from 'vite';

import externalGlobals from 'rollup-plugin-external-globals';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['phaser'],
      plugins: [
        externalGlobals({
          'phaser': 'phaser'
        })
      ]
    }
  }
});
