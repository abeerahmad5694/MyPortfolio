import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { apiMiddleware } from "./server/api.mjs";

/** SQLite-backed inquiries API, mounted into the dev server (same origin). */
const apiPlugin: Plugin = {
  name: "inquiries-api",
  configureServer(server) {
    server.middlewares.use(apiMiddleware);
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
