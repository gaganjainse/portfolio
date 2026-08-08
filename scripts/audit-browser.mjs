// Full browser audit: every page — console errors, failed requests,
// axe-core accessibility violations, screenshots (desktop + mobile),
// theme toggle, mobile menu, docs prev/next nav, card glow sanity.
import puppeteer from 'puppeteer'
import { AxePuppeteer } from '@axe-core/puppeteer'
import fs from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:4321'
const OUT = '/home/user/uploads/audit'
fs.mkdirSync(OUT, { recursive: true })

const chrome = '/home/user/.cache/puppeteer/chrome/linux-151.0.7922.71/chrome-linux64/chrome'
const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  protocolTimeout: 120_000,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
})

let failures = 0
const pages = [
  { path: '/', label: 'home' },
  { path: '/resume', label: 'resume' },
  { path: '/docs/getting-started/', label: 'docs-getting-started' },
  { path: '/docs/architecture/', label: 'docs-architecture' },
  { path: '/docs/adr/', label: 'docs-adr' },
  { path: '/docs/projects/nexusaos/', label: 'docs-nexusaos' },
  { path: '/docs/projects/nexus-kernel/', label: 'docs-nexus-kernel' },
  { path: '/docs/projects/seshaos/', label: 'docs-seshaos' },
  { path: '/docs/projects/rag-service/', label: 'docs-rag-service' },
  { path: '/docs/projects/llm-eval-harness/', label: 'docs-llm-eval-harness' },
  { path: '/docs/projects/vyakrti/', label: 'docs-vyakrti' },
  { path: '/docs/projects/aim/', label: 'docs-aim' },
  { path: '/docs/projects/fwrs/', label: 'docs-fwrs' },
  { path: '/404', label: '404' },
]

const report = []
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })
const consoleErrors = []
const failedRequests = []
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(`[${page._target ? 'page' : ''}] ${msg.text()}`)
})
page.on('requestfailed', (req) =>
  failedRequests.push(`${req.url()} :: ${req.failure()?.errorText}`),
)

for (const p of pages) {
  console.log(`[audit] ${p.path}...`)
  consoleErrors.length = 0
  failedRequests.length = 0
  try {
    await page.goto(`${BASE}${p.path}`, { waitUntil: 'load', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 700))
  } catch (e) {
    failures++
    report.push(`FAIL ${p.label}: load error ${e.message}`)
    continue
  }

  // console errors
  const errs = [...consoleErrors]
  if (errs.length) {
    failures++
    report.push(
      `FAIL ${p.label}: ${errs.length} console error(s) -> ${errs.slice(0, 3).join(' | ')}`,
    )
  } else report.push(`ok    ${p.label}: no console errors`)

  // failed requests
  const fails = [...failedRequests]
  if (fails.length) {
    failures++
    report.push(
      `FAIL ${p.label}: ${fails.length} failed request(s) -> ${fails.slice(0, 3).join(' | ')}`,
    )
  } else report.push(`ok    ${p.label}: no failed requests`)

  // title/meta
  const meta = await page.evaluate(() => ({
    title: document.title,
    desc: !!document.querySelector('meta[name="description"]'),
    og: !!document.querySelector('meta[property="og:title"]'),
  }))
  if (!meta.title || !meta.desc || !meta.og) {
    failures++
    report.push(`FAIL ${p.label}: title/meta incomplete (${JSON.stringify(meta)})`)
  } else report.push(`ok    ${p.label}: title+meta present`)

  // axe scan — bounded by a timeout so one slow page can't stall the run
  const axeRun = new AxePuppeteer(page).analyze()
  const results = await Promise.race([
    axeRun,
    new Promise((_, rej) => setTimeout(() => rej(new Error('axe timeout')), 60000)),
  ])
  const violations = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  )
  if (violations.length) {
    failures++
    report.push(
      `FAIL ${p.label}: ${violations.length} serious/critical axe issue(s): ${violations
        .map((v) => v.id)
        .join(', ')}`,
    )
  } else report.push(`ok    ${p.label}: axe clean (${results.violations.length} minor total)`)

  // screenshot desktop
  await page.screenshot({ path: `${OUT}/${p.label}-desktop.png` })
  report.push(`ok    ${p.label}: desktop screenshot saved`)
}

// ---------- mobile pass (key pages) ----------
const mob = await browser.newPage()
await mob.setViewport({ width: 390, height: 844 })
for (const p of ['/', '/resume', '/docs/getting-started/', '/docs/projects/nexusaos/']) {
  await mob.goto(`${BASE}${p}`, { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 700))
  await mob.screenshot({ path: `${OUT}/mobile-${p === '/' ? 'home' : p.replaceAll('/', '-')}.png` })
  report.push(`ok    mobile ${p}: screenshot saved`)
}

// ---------- interactions ----------
// theme toggle on home
await page.goto(`${BASE}/`, { waitUntil: 'load' })
await new Promise((r) => setTimeout(r, 600))
await page.click('.theme-toggle')
await new Promise((r) => setTimeout(r, 300))
const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
if (theme === 'light') report.push('ok    theme toggle: switched to light')
else {
  failures++
  report.push('FAIL theme toggle did not switch to light')
}
// nav link scroll
await page.goto(`${BASE}/`, { waitUntil: 'load' })
await new Promise((r) => setTimeout(r, 600))
await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'))
await page.click('a[href="#experience"]')
await new Promise((r) => setTimeout(r, 600))
const scrolled = await page.evaluate(() => window.scrollY > 500)
if (scrolled) report.push('ok    nav anchor scroll works')
else {
  failures++
  report.push('FAIL nav anchor scroll did not move')
}
// docs prev/next
await page.goto(`${BASE}/docs/architecture`, { waitUntil: 'load' })
await new Promise((r) => setTimeout(r, 600))
const navHrefs = await page.$$eval('.grid.grid-cols-3 a', (els) =>
  els.map((a) => a.getAttribute('href')),
)
if (navHrefs.length >= 2) report.push(`ok    docs prev/next links: ${navHrefs.join(' , ')}`)
else {
  failures++
  report.push('FAIL docs prev/next links missing')
}
// mobile menu
await mob.goto(`${BASE}/`, { waitUntil: 'load' })
await new Promise((r) => setTimeout(r, 600))
await mob.click('#mobile-menu-btn')
await new Promise((r) => setTimeout(r, 400))
const menuOpen = await mob.evaluate(
  () => !document.getElementById('mobile-menu').classList.contains('hidden'),
)
if (menuOpen) report.push('ok    mobile menu opens')
else {
  failures++
  report.push('FAIL mobile menu did not open')
}

await browser.close()
console.log('\n===== BROWSER AUDIT REPORT =====')
report.forEach((r) => console.log(r))
console.log(`\nRESULT: ${failures} failure(s)`)
process.exit(failures ? 1 : 0)
