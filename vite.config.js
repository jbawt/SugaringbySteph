import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Copy index.html → 404.html so GitHub Pages serves the SPA on deep links. */
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// GitHub Pages project sites live at /repo-name/. Netlify / local stay at /.
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react(), githubPagesSpaFallback()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
