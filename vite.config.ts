import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// `base: "./"` keeps asset URLs relative, so the same build works on a
// user site (sdmustafa.github.io) and on a project-site sub-path.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Exact match only; subpaths like "@devigner-ui/icons/Copy" pass through.
      { find: /^@devigner-ui\/icons$/, replacement: path.resolve(import.meta.dirname, "src/lib/icons.ts") },
      { find: "@", replacement: path.resolve(import.meta.dirname, "src") },
    ],
  },
});
