import puppeteer from 'puppeteer'
import { AxePuppeteer } from '@axe-core/puppeteer'
const chrome = '/home/user/.cache/puppeteer/chrome/linux-151.0.7922.71/chrome-linux64/chrome'
const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  protocolTimeout: 90000,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
})

const pages = [
  '/',
  '/resume',
  '/docs/getting-started/',
  '/docs/architecture/',
  '/docs/adr/',
  '/docs/projects/nexusaos/',
  '/docs/projects/nexus-kernel/',
  '/docs/projects/seshaos/',
  '/docs/projects/rag-service/',
  '/docs/projects/llm-eval-harness/',
  '/docs/projects/vyakrti/',
  '/docs/projects/aim/',
  '/docs/projects/fwrs/',
  '/404.html',
]
let failures = 0
for (const path of pages) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  const errs = [],
    fails = [],
    notFound = []
  page.on('console', (m) => {
    if (m.type() === 'error') errs.push(m.text().slice(0, 100))
  })
  page.on('requestfailed', (r) => {
    const u = r.url()
    if (u.includes('/_vercel/')) return
    fails.push(`${u.split('/').pop()} :: ${r.failure()?.errorText}`)
  })
  page.on('response', (r) => {
    if (r.status() === 404) notFound.push(r.url())
  })
  let ok = true
  try {
    await page.goto(`http://localhost:4321${path}`, { waitUntil: 'load', timeout: 20000 })
    await new Promise((r) => setTimeout(r, 400))
  } catch (e) {
    ok = false
    failures++
    console.log(`FAIL ${path}: load ${e.message?.slice(0, 60)}`)
  }
  if (ok) {
    const meta = await page.evaluate(() => ({
      title: !!document.title,
      desc: !!document.querySelector('meta[name="description"]'),
      og: !!document.querySelector('meta[property="og:title"]'),
      canon: !!document.querySelector('link[rel="canonical"]'),
    }))
    if (!meta.title || !meta.desc || !meta.og || !meta.canon) {
      failures++
      console.log(`FAIL ${path}: meta ${JSON.stringify(meta)}`)
    }
    const realErrs = errs.filter(
      (e) =>
        !(
          e.includes('Failed to load resource') &&
          notFound.every((u) => u.includes('/_vercel/')) &&
          notFound.length > 0
        ),
    )
    if (realErrs.length) {
      failures++
      console.log(
        `FAIL ${path}: ${realErrs.length} console errors: ${realErrs.slice(0, 2).join(' | ')}`,
      )
    }
    if (fails.length) {
      failures++
      console.log(`FAIL ${path}: ${fails.length} failed reqs: ${fails.slice(0, 2).join(' | ')}`)
    }
    // axe
    try {
      const res = await Promise.race([
        new AxePuppeteer(page).analyze(),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 30000)),
      ])
      const ser = res.violations.filter((v) => ['serious', 'critical'].includes(v.impact))
      if (ser.length) {
        failures++
        console.log(`FAIL ${path}: axe ${ser.map((v) => v.id).join(',')}`)
      } else console.log(`ok    ${path}: meta ✓ console ✓ reqs ✓ axe ✓`)
    } catch (e) {
      failures++
      console.log(`FAIL ${path}: axe ${e.message?.slice(0, 50)}`)
    }
  }
  await page.close()
}
await browser.close()
console.log(`\nRESULT: ${failures} failure(s)`)
process.exit(failures ? 1 : 0)
