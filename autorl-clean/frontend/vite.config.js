import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  // Keep the plugin set minimal; Tailwind may be configured via PostCSS
  // or a separate Vite plugin. Avoid loading a non-existent '@tailwindcss/vite'
  plugins: [react()],
  // Use relative base so built assets work when the site is served from a nested
  // preview path (e.g. lovable preview under /projects/<id>/). Using './' makes
  // asset URLs relative to the current path.
  base: process?.env?.VITE_BASE || './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
