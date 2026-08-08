// Static audit of the built dist/ — files, internal links, sitemap,
// meta/SEO head tags, forbidden patterns (nested <p>, empty links, dead refs).
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve('dist')
const SITE = 'https://gaganjain.vercel.app'
let errors = 0
let warnings = 0

const fail = (msg) => {
  errors++
  console.log(`FAIL  ${msg}`)
}
const warn = (msg) => {
  warnings++
  console.log(`WARN  ${msg}`)
}
const ok = (msg) => console.log(`ok    ${msg}`)

// ---------- expected pages ----------
const PAGES = [
  '/',
  '/404',
  '/resume',
  '/docs/getting-started',
  '/docs/architecture',
  '/docs/adr',
  '/docs/projects/nexusaos',
  '/docs/projects/nexus-kernel',
  '/docs/projects/seshaos',
  '/docs/projects/rag-service',
  '/docs/projects/llm-eval-harness',
  '/docs/projects/vyakrti',
  '/docs/projects/aim',
  '/docs/projects/fwrs',
]
console.log('--- pages ---')
for (const p of PAGES) {
  const f = path.join(
    DIST,
    p === '/' ? 'index.html' : p === '/404' ? '404.html' : `${p}/index.html`,
  )
  if (fs.existsSync(f)) ok(`${p} -> ${f}`)
  else fail(`${p} missing (${f})`)
}

// ---------- static assets ----------
console.log('--- static assets ---')
const ASSETS = [
  'og-image.png',
  'favicon.svg',
  'apple-touch-icon.png',
  'manifest.webmanifest',
  'robots.txt',
  'llms.txt',
  'resume.pdf',
]
for (const a of ASSETS) {
  if (fs.existsSync(path.join(DIST, a))) ok(a)
  else fail(`${a} missing`)
}

// ---------- sitemap ----------
console.log('--- sitemap ---')
const smPath = path.join(DIST, 'sitemap-index.xml')
if (!fs.existsSync(smPath)) {
  fail('sitemap-index.xml missing')
} else {
  ok('sitemap-index.xml exists')
  const idx = fs.readFileSync(smPath, 'utf8')
  const inner = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  console.log(`     inner sitemaps: ${inner.join(', ')}`)
  let urls = []
  for (const u of inner) {
    const fn = path.join(DIST, new URL(u).pathname.replace(/^\//, ''))
    if (fs.existsSync(fn)) {
      const s = fs.readFileSync(fn, 'utf8')
      urls.push(...[...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))
    } else fail(`inner sitemap file missing: ${u}`)
  }
  const expected = new Set(
    PAGES.filter((p) => p !== '/404').map((p) => `${SITE}${p === '/' ? '' : p}`.replace(/\/$/, '')),
  )
  const got = new Set(urls.map((u) => u.replace(/\/$/, '')))
  for (const e of expected) if (!got.has(e)) fail(`sitemap missing ${e}`)
  ok(`sitemap has ${urls.length} urls, all expected pages present`)
}

// ---------- robots / manifest / llms ----------
console.log('--- robots / manifest / llms ---')
const robots = fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8')
if (/Sitemap:\s*https:\/\/gaganjain\.vercel\.app\/sitemap-index\.xml/.test(robots))
  ok('robots.txt sitemap line')
else fail('robots.txt sitemap line missing')
const llms = fs.readFileSync(path.join(DIST, 'llms.txt'), 'utf8')
if (llms.includes('Gagan Jain') && /github\.com\/gaganjainse/.test(llms)) ok('llms.txt content')
else fail('llms.txt content unexpected')

// ---------- head / meta audit on every html ----------
console.log('--- head / meta / html hygiene ---')
const htmlFiles = []
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.html')) htmlFiles.push(p)
  }
}
walk(DIST)
let nestedP = 0
let deadHrefs = []
let emptyAnchors = 0
let hashOnly = 0
const distSet = new Set()
for (const f of htmlFiles)
  distSet.add(
    f
      .replace(DIST, '')
      .replace(/index\.html$/, '')
      .replace(/\.html$/, ''),
  )

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8')
  const rel = f.replace(DIST, '')
  // nested <p> (invalid HTML)
  if (/<p[^>]*>(\s*)<p/.test(html)) {
    nestedP++
    fail(`nested <p> in ${rel}`)
  }
  // meta essentials
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  if (!title || !title.includes('Gagan')) fail(`${rel} title missing/odd`)
  if (!html.includes('name="description"')) fail(`${rel} missing meta description`)
  if (!html.includes('property="og:title"')) fail(`${rel} missing og:title`)
  if (!html.includes('property="og:image"')) fail(`${rel} missing og:image`)
  if (!html.includes('name="twitter:card"')) fail(`${rel} missing twitter:card`)
  if (!html.includes('rel="canonical"')) fail(`${rel} missing canonical`)
  if (!html.includes('application/ld+json')) warn(`${rel} missing JSON-LD`)
  // internal links
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
  for (const h of hrefs) {
    if (!h || h === '#') {
      hashOnly++
      continue
    }
    if (
      /^[a-z]+:/i.test(h) ||
      h.startsWith('mailto:') ||
      h.startsWith('tel:') ||
      h.startsWith('//')
    )
      continue
    const clean = h.split('#')[0].split('?')[0]
    if (!clean) continue
    if (clean.startsWith('/')) {
      const target = clean === '/' ? 'index.html' : clean.replace(/\/$/, '') + '/index.html'
      if (
        !fs.existsSync(path.join(DIST, target)) &&
        !fs.existsSync(path.join(DIST, clean.slice(1)))
      ) {
        deadHrefs.push(`${rel} -> ${h}`)
      }
    }
  }
  // empty anchor text
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>\s*<\/a>/g)]
  for (const a of anchors) {
    if (!a[1].startsWith('#')) emptyAnchors++
  }
}
if (!nestedP) ok('no nested <p> anywhere')
if (deadHrefs.length) {
  deadHrefs.forEach((d) => fail(`dead internal link: ${d}`))
} else ok('no dead internal links')
if (!emptyAnchors) ok('no empty anchors')
else warn(`${emptyAnchors} empty anchors (non-#)`)

// ---------- asset refs resolve ----------
console.log('--- asset refs ---')
let missingAsset = 0
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8')
  const refs = [
    ...[...html.matchAll(/(?:src|href)="(\/_astro\/[^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/content="([^"]*\/_astro\/[^"]+)"/g)].map((m) => m[1]),
  ]
  for (const r of refs) {
    const target = path.join(DIST, r.replace(/^\//, ''))
    if (!fs.existsSync(target)) {
      missingAsset++
      fail(`missing asset ref: ${r} in ${f.replace(DIST, '')}`)
    }
  }
}
if (!missingAsset) ok('all /_astro/ asset refs resolve')
else ok(`checked; ${missingAsset} missing`)

console.log('--- og image sanity ---')
const og = fs.statSync(path.join(DIST, 'og-image.png'))
if (og.size > 50_000) ok(`og-image.png size ${og.size} bytes`)
else fail('og-image.png suspiciously small')

console.log(`\nRESULT: ${errors} error(s), ${warnings} warning(s)`)
process.exit(errors ? 1 : 0)
