/**
 * Build-time prerender for marketing routes.
 * Writes static HTML into dist/ so Netlify serves real files to crawlers
 * (static files take precedence over the SPA /* → /index.html redirect).
 *
 * After snapshotting, Beasties inlines above-the-fold CSS and loads the rest async.
 */
import { execSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import puppeteer from 'puppeteer'
import Beasties from 'beasties'

function deferBootInHtml(html) {
  let next = html.replace(/<link[^>]+rel=["']modulepreload["'][^>]*>\s*/gi, '')
  next = next.replace(
    /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/i,
    (_full, srcPath) => `<script type="module">
(function(){
  var src=${JSON.stringify(srcPath)};
  var boot=function(){import(src)};
  var schedule=function(){
    if('requestIdleCallback' in window){
      requestIdleCallback(boot,{timeout:4000});
    } else {
      setTimeout(boot,1);
    }
  };
  // Wait for load so prerendered HTML can paint as FCP/LCP without competing with React.
  if(document.readyState==='complete'){schedule();}
  else{window.addEventListener('load',schedule,{once:true});}
})();
</script>`,
  )
  return next
}

/** Remove third-party tags accidentally captured during Puppeteer snapshot. */
function scrubThirdPartyFromHtml(html) {
  return html
    .replace(/<script[^>]*googletagmanager\.com[^>]*>\s*<\/script>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?googletagmanager\.com[\s\S]*?<\/script>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?gtag\s*\([\s\S]*?<\/script>/gi, '')
}

/** Critical font faces so preloaded WOFF2 can apply before async CSS. */
const CRITICAL_FONT_FACES = `<style id="critical-fonts">
@font-face{font-family:"Cormorant Garamond";font-style:normal;font-weight:600;font-display:swap;src:url(/fonts/cormorant-600.woff2) format("woff2")}
@font-face{font-family:Lato;font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/lato-400.woff2) format("woff2")}
</style>`

function injectCriticalFonts(html) {
  if (html.includes('id="critical-fonts"')) return html
  if (html.includes('</head>')) {
    return html.replace('</head>', `${CRITICAL_FONT_FACES}</head>`)
  }
  return html
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')

const ROUTES = ['/', '/services', '/about', '/faq', '/contact']

function outputPathForRoute(route) {
  if (route === '/') return join(distDir, 'index.html')
  return join(distDir, route.replace(/^\//, ''), 'index.html')
}

function ensureChrome() {
  console.log('Ensuring Puppeteer Chrome is installed…')
  execSync('npx puppeteer browsers install chrome', {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      PUPPETEER_SKIP_DOWNLOAD: 'false',
      PUPPETEER_SKIP_CHROME_DOWNLOAD: 'false',
    },
  })
}

async function launchBrowser() {
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  }

  try {
    return await puppeteer.launch(launchOptions)
  } catch (error) {
    console.warn('Puppeteer launch failed, installing Chrome and retrying…')
    console.warn(error.message)
    ensureChrome()
    return puppeteer.launch(launchOptions)
  }
}

async function waitForPageReady(page) {
  await page.waitForSelector('#root', { timeout: 15000 })

  await page.waitForFunction(
    () => {
      const root = document.getElementById('root')
      return Boolean(root && root.innerText && root.innerText.trim().length > 80)
    },
    { timeout: 30000 },
  )

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

  const beasties = new Beasties({
    path: distDir,
    publicPath: '/',
    // Mobile first viewport for critical CSS
    width: 412,
    height: 915,
    inlineFonts: false,
    preload: 'media',
    noscriptFallback: true,
    reduceInlineStyles: true,
    pruneSource: false,
    mergeStylesheets: true,
  })

  const browser = await launchBrowser()

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
      await page.waitForNetworkIdle({ idleTime: 500, timeout: 15000 }).catch(() => {})
      await waitForPageReady(page)

      let html = await page.content()
      try {
        html = await beasties.process(html)
        html = scrubThirdPartyFromHtml(html)
        html = injectCriticalFonts(html)
        html = deferBootInHtml(html)
      } catch (error) {
        console.warn(`  beasties failed on ${route}:`, error.message)
        html = scrubThirdPartyFromHtml(html)
        html = injectCriticalFonts(html)
        html = deferBootInHtml(html)
      }

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
