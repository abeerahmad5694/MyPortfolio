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
    host: true,
    allowedHosts: true,
  },
});
