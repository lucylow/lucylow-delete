import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Use relative base so built assets work when the site is served from a nested
  // preview path (e.g. lovable preview under /projects/<id>/). Using './' makes
  // asset URLs relative to the current path.
  base: process.env.VITE_BASE || './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
