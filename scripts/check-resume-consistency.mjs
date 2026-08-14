#!/usr/bin/env node
/**
 * check-resume-consistency.mjs — the fact-drift gate for the résumé.
 *
 * Grammar checkers can't catch this class of bug: the résumé was grammatically
 * perfect while claiming "NexusAOS", "12 workspace crates", and "981 tests"
 * (the true values are SheshAOS, 9 crates + CLI, 877). This gate enforces:
 *
 *   1. No retired/forbidden names anywhere in the living résumé sources.
 *   2. The project set in the print template (public/resume.html) matches the
 *      data file (src/data/projects.ts) — by GitHub repo slug.
 *   3. The SheshAOS numbers (test count, crate count) match src/data/resume-facts.json,
 *      which is the single verified source of truth.
 *   4. Live checks: Cargo.toml workspace-members count and the account's public
 *      repo count, fetched from GitHub at CI time.
 *
 * Exit 1 on any violation. No || true, no silent pass.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8').replace(/\s+/g, ' ')

let fails = 0
const fail = (m) => {
  console.error('FAIL:', m)
  fails += 1
}
const ok = (m) => console.log('ok  :', m)

// ---- load facts ----
const FACTS = JSON.parse(read('src/data/resume-facts.json'))
const S = FACTS.SheshAOS

// ---- sources ----
const resumeMdx = read('src/pages/resume.mdx')
const projectsTs = read('src/data/projects.ts')
const resumeHtml = read('public/resume.html')

// ===== 1. forbidden terms (retired names must not appear in living docs) =====
const FORBIDDEN = [
  'NexusAOS',
  'nexus-aos',
  'nexusaos',
  'Nexus bridge',
  'nexus-kernel',
  'nexus_kernel',
  'SeshaOS',
  'sesha-os',
  'Sesha OS',
  'seshaos',
  'sesha',
  '12 workspace crates',
  '12-crate workspace',
]
for (const [name, text] of [
  ['src/pages/resume.mdx', resumeMdx],
  ['src/data/projects.ts', projectsTs],
  ['public/resume.html', resumeHtml],
]) {
  for (const term of FORBIDDEN) {
    if (text.includes(term)) fail(`${name} contains forbidden term "${term}"`)
  }
}
ok('no forbidden/retired terms in résumé sources')

// ===== 2. project set consistency: GitHub slugs must match across files =====
const tsSlugs = new Set(
  [...projectsTs.matchAll(/github:\s*'https:\/\/github\.com\/gaganjainse\/([^']+)'/g)].map(
    (m) => m[1],
  ),
)
const htmlSlugs = new Set(
  [...resumeHtml.matchAll(/href="https:\/\/github\.com\/gaganjainse\/([^"]+)"/g)].map((m) => m[1]),
)
if (tsSlugs.size === 0) fail('no project slugs parsed from projects.ts')
if (htmlSlugs.size === 0) fail('no project slugs parsed from resume.html')
for (const s of tsSlugs)
  if (!htmlSlugs.has(s)) fail(`projects.ts has "${s}" but resume.html is missing it`)
for (const s of htmlSlugs)
  if (!tsSlugs.has(s)) fail(`resume.html has "${s}" but projects.ts is missing it`)
ok(`project sets match (${tsSlugs.size} repos): ${[...tsSlugs].sort().join(', ')}`)

// ===== 3. per-project numbers match facts =====
if (!projectsTs.includes(`tests: ${S.tests},`)) fail(`projects.ts SheshAOS tests != ${S.tests}`)
for (const [proj, n] of Object.entries(FACTS.projects || {})) {
  if (!projectsTs.includes(`tests: ${n},`)) fail(`projects.ts ${proj} tests != ${n} (facts)`)
  const gitSlug = [
    ...projectsTs.matchAll(/github:\s*'https:\/\/github\.com\/gaganjainse\/([^']+)'/g),
  ].map((m) => m[1])
  if (
    gitSlug.includes(proj) &&
    !projectsTs.includes(`title: '${proj}'`) &&
    !projectsTs.includes(`title: "${proj}"`)
  ) {
    // title presence is implied by the slug; no-op
  }
}
ok(`per-project test counts match facts (${Object.keys(FACTS.projects || {}).join(', ')})`)
if (!resumeHtml.includes(`${S.tests}+ passing tests`))
  fail(`resume.html missing "${S.tests}+ passing tests"`)
if (!resumeMdx.includes(`${S.tests}+ tests`)) fail(`resume.mdx missing "${S.tests}+ tests"`)
ok(`SheshAOS test count consistent (${S.tests}) across data, print template, web prose`)

// ===== 4. live checks =====
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const authHeaders = { 'User-Agent': 'resume-facts-gate' }
if (GITHUB_TOKEN) authHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`

const cargoToml = await (
  await fetch('https://raw.githubusercontent.com/gaganjainse/SheshAOS/main/Cargo.toml', {
    headers: authHeaders,
  })
).text()
const membersBlock = cargoToml.match(/members\s*=\s*\[([\s\S]*?)\]/)
if (!membersBlock) {
  fail('could not parse [workspace].members from SheshAOS Cargo.toml')
} else {
  const members = [...membersBlock[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
  if (members.length !== S.workspace_members) {
    fail(`SheshAOS workspace members = ${members.length}, facts say ${S.workspace_members}`)
  } else {
    ok(`SheshAOS workspace members = ${members.length} (facts: ${S.workspace_members})`)
  }
}

const userRes = await fetch('https://api.github.com/users/gaganjainse', { headers: authHeaders })
if (!userRes.ok) {
  fail(`GitHub API returned ${userRes.status} for /users/gaganjainse`)
} else {
  const publicRepos = (await userRes.json()).public_repos
  if (typeof publicRepos !== 'number') {
    fail('public_repos not a number')
  } else if (publicRepos < FACTS.public_repos_min) {
    fail(`public_repos=${publicRepos} below facts minimum ${FACTS.public_repos_min}`)
  } else {
    ok(`public_repos=${publicRepos} >= facts minimum ${FACTS.public_repos_min}`)
  }
}

if (fails > 0) {
  console.error(`\n${fails} violation(s) — résumé facts are inconsistent.`)
  process.exit(1)
}
console.log('\nAll résumé consistency checks passed.')
