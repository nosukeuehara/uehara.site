import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/uehara.site",
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
