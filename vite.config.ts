import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/api/meigen': {
        target: 'https://meigen.doodlenote.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/meigen/, '/api/json.php'),
      },
    },
  },
});
