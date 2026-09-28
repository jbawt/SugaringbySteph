import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { deferSpaBoot } from './vite-plugin-defer-boot.js'

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

const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react(), deferSpaBoot(), githubPagesSpaFallback()],
  build: {
    outDir: 'dist',
    sourcemap: process.env.SOURCEMAP === 'true',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
    cssMinify: true,
    minify: 'esbuild',
    target: 'es2020',
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
