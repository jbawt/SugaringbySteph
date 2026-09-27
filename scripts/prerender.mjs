/**
 * Build-time prerender for marketing routes.
 * Writes static HTML into dist/ so Netlify serves real files to crawlers
 * (static files take precedence over the SPA /* → /index.html redirect).
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')

const ROUTES = ['/', '/services', '/about', '/faq', '/contact']

function outputPathForRoute(route) {
  if (route === '/') return join(distDir, 'index.html')
  return join(distDir, route.replace(/^\//, ''), 'index.html')
}

async function waitForPageReady(page) {
  await page.waitForSelector('#root', { timeout: 15000 })

  await page.waitForFunction(
    () => {
      const root = document.getElementById('root')
      return Boolean(root && root.innerText && root.innerText.trim().length > 80)
    },
    { timeout: 30000 }
  )

  // Give Helmet a moment to flush title/meta/JSON-LD into <head>.
  await new Promise((resolve) => setTimeout(resolve, 500))

  await page.evaluate(async () => {
    window.__PRERENDER__ = true
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 250))
    window.scrollTo(0, 0)
  })
}

async function main() {
  console.log('Starting Vite preview for prerender…')
  const server = await preview({
    root,
    preview: {
      host: '127.0.0.1',
      port: 4173,
      strictPort: true,
    },
  })

  const baseUrl = 'http://127.0.0.1:4173'
  console.log(`Preview at ${baseUrl}`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      page.on('pageerror', (error) => {
        console.warn(`  page error on ${route}:`, error.message)
      })

      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      await page.evaluateOnNewDocument(() => {
        window.__PRERENDER__ = true
      })

      const url = `${baseUrl}${route}`
      console.log(`Prerendering ${url}`)
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
      // Wait for JS bundles / fonts without hanging forever on open connections.
      await page.waitForNetworkIdle({ idleTime: 500, timeout: 15000 }).catch(() => {})
      await waitForPageReady(page)

      const html = await page.content()
      const hasJsonLd = html.includes('application/ld+json')
      const hasContent = html.includes('Sugaring')
      if (!hasContent) {
        throw new Error(`Prerendered ${route} is missing expected content`)
      }
      if (!hasJsonLd) {
        console.warn(`  warning: no JSON-LD found in ${route} HTML`)
      }

      const outFile = outputPathForRoute(route)
      await mkdir(dirname(outFile), { recursive: true })
      await writeFile(outFile, `<!DOCTYPE html>\n${html.replace(/^<!DOCTYPE html>/i, '')}`, 'utf8')
      console.log(`  → ${outFile.replace(`${root}/`, '')} (${Math.round(html.length / 1024)} KB)`)
      await page.close()
    }
  } finally {
    await browser.close()
    await server.close()
  }

  console.log('Prerender complete.')
}

main().catch((error) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
