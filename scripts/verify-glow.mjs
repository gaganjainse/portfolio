// Verify that every card across the site gets the gradient ring + glow on hover.
// Usage: BASE_URL=http://localhost:4321 node scripts/verify-glow.mjs
// (requires the site to be served and puppeteer's bundled Chrome available;
//  set PUPPETEER_EXECUTABLE_PATH to point at a chrome binary if needed)
import puppeteer from 'puppeteer'
import fs from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:4321'
const OUT = process.env.OUT_DIR || '/tmp/glow-shots'
// puppeteer resolves its cached Chrome automatically; override via env if needed
const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH || undefined

// All cards that must glow on hover: [page url, selector, label]
const targets = [
  { url: `${BASE}/`, sel: '#home .gradient-border', label: 'home · hero card' },
  { url: `${BASE}/`, sel: '#about .gradient-border', label: 'home · about card' },
  { url: `${BASE}/`, sel: '#skills .gradient-border', label: 'home · skills cards' },
  { url: `${BASE}/`, sel: '#projects .project-card', label: 'home · project cards' },
  { url: `${BASE}/`, sel: '#experience .timeline-item', label: 'home · experience cards' },
  { url: `${BASE}/`, sel: '#contact .gradient-border', label: 'home · contact card' },
  { url: `${BASE}/`, sel: 'footer .gradient-border', label: 'home · footer card' },
  { url: `${BASE}/docs/architecture`, sel: '.docs-sheet', label: 'docs · main content card' },
  { url: `${BASE}/docs/architecture`, sel: 'aside nav.glow-card', label: 'docs · sidebar card' },
  {
    url: `${BASE}/docs/architecture`,
    sel: '.grid.grid-cols-3',
    label: 'docs · prev/home/next card',
  },
  { url: `${BASE}/resume`, sel: '.resume-sheet', label: 'resume · sheet' },
  { url: `${BASE}/resume`, sel: '.resume-card', label: 'resume · inner cards' },
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
})

let failures = 0
const seen = new Set()
for (const t of targets) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 1000 })
  await page.goto(t.url, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 700))
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    const st = document.createElement('style')
    st.textContent = '* { animation: none !important; transition: none !important; }'
    document.head.appendChild(st)
  })

  const el = await page.$(t.sel)
  if (!el) {
    console.log(`FAIL  ${t.label} — selector not found`)
    failures++
    await page.close()
    continue
  }
  await el.evaluate((e) => e.scrollIntoView({ block: 'center', behavior: 'instant' }))
  await new Promise((r) => setTimeout(r, 250))
  const box = await el.boundingBox()
  if (!box) {
    console.log(`FAIL  ${t.label} — no bounding box`)
    failures++
    await page.close()
    continue
  }
  // Small cards: hover the center. Very tall cards (docs/resume sheets): their
  // top edge ends up under the sticky header after centering, so hover a point
  // just below the card top, clamped into the viewport.
  const viewportH = await page.evaluate(() => window.innerHeight)
  const hovY = box.height <= viewportH * 0.8 ? box.y + box.height / 2 : box.y + 120
  const x = Math.min(box.x + box.width / 2, 1270)
  const y = Math.min(Math.max(hovY, 140), 940)
  await page.mouse.move(x, y)
  await new Promise((r) => setTimeout(r, 250))
  const st = await page.evaluate((s) => {
    const e = document.querySelector(s)
    if (!e) return null
    return {
      opacity: parseFloat(getComputedStyle(e, '::before').opacity),
      hovered: e.matches(':hover'),
    }
  }, t.sel)

  const ok = st && st.hovered && st.opacity > 0.85
  console.log(
    `${ok ? 'OK   ' : 'FAIL '} ${t.label} — ringOpacity=${st?.opacity ?? 'n/a'} hovered=${st?.hovered}`,
  )
  if (!ok) failures++

  if (!seen.has(t.url)) {
    fs.mkdirSync(OUT, { recursive: true })
    await page.screenshot({
      path: `${OUT}/${t.label.split('·')[0].trim().replace(/\s+/g, '-')}.png`,
    })
    seen.add(t.url)
  }
  await page.close()
}

await browser.close()
console.log(failures === 0 ? 'ALL CARDS GLOW ✓' : `${failures} FAILURE(S)`)
process.exit(failures === 0 ? 0 : 1)
