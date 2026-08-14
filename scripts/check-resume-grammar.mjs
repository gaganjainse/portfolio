#!/usr/bin/env node
/**
 * check-resume-grammar.mjs — prose pass over the résumé via the LanguageTool
 * public API (open-source grammar checker).
 *
 * Inputs are the *prose* surfaces only: public/resume.html (tags stripped) and
 * the project descriptions in src/data/projects.ts. We deliberately do NOT lint
 * resume.mdx directly — it is code-heavy (frontmatter, JSX, Tailwind classes)
 * and produces only false positives; its prose is duplicated in resume.html,
 * which IS linted.
 *
 * Noise handling: tech terms, CamelCase identifiers, version/model tokens
 * (anything with a digit), hyphenated/slashed compounds, and ALL-CAPS acronyms
 * are skipped — a résumé's vocabulary is inherently technical.
 *
 * This pass is ADVISORY by default (exit 0): it prints every finding and
 * suppresses nothing, but does not block CI, because a small tail of new
 * tech terms will always read as false-positive "typos". Pass --strict to
 * fail on surviving spelling errors (useful locally once the allowlist covers
 * the current vocabulary). The *blocking* drift protection lives in
 * scripts/check-resume-consistency.mjs, which is exact and never flaky.
 *
 * Exit 1 only in --strict mode on surviving TYPOS, or if the API is unreachable.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const LT_URL = 'https://api.languagetool.org/v2/check'
const MAX_BYTES = 15_000

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

function stripHtml(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/\s+/g, ' ')
    .trim()
}

const ALLOWLIST = new Set(
  [
    // names / places
    'gagan',
    'jain',
    'jaipur',
    'vellore',
    'codenplay',
    'gaganjainse',
    // project & product names
    'sheshaos',
    'shesh',
    'vyakrti',
    'vyākṛti',
    'omniroute',
    // frameworks / tools
    'litellm',
    'ollama',
    'langchain',
    'llamaindex',
    'fastapi',
    'chromadb',
    'ragas',
    'pytest',
    'tokio',
    'axum',
    'ratatui',
    'iced',
    'tailwind',
    'monaco',
    'zustand',
    'gunicorn',
    'nginx',
    'laravel',
    'supabase',
    'mongodb',
    'redis',
    'sqlite',
    'docker',
    'websockets',
    'folium',
    'leaflet',
    'tkinter',
    'pulp',
    'chart',
    'fullcalendar',
    'cachyos',
    'hyprland',
    'moondream',
    'nomic',
    'embed',
    'text',
    'qwen',
    'gemma',
    'phi',
    'lora',
    'qlora',
    'vram',
    'vr',
    'vdir',
    'ical',
    'icalendar',
    'vevent',
    'vdirsyncer',
    'khal',
    'imap',
    'guardedmcp',
    'mcp',
    'a2a',
    'pwa',
    'rag',
    'nlp',
    'gpt',
    'api',
    'apis',
    'openai',
    'anthropic',
    'codesys',
    'node',
    'red',
    'plc',
    'hmi',
    'zig',
    'argon',
    'hsts',
    'csrf',
    'csp',
    'jwt',
    'prometheus',
    'kubernetes',
    'linux',
    'llms',
    'ai',
    'llm',
    'genai',
    'rpc',
    'cli',
    'tui',
    'gui',
    'ssh',
    'pty',
    'vt100',
    'bm25',
    'rrf',
    'arxiv',
    'github',
    'gitlab',
    'vercel',
    'linkedin',
    'i18n',
    'aos',
    'ide',
    'lsp',
    'repl',
    'rtk',
    'caveman',
    'ngo',
    'ngos',
    'blas',
    'cuda',
    'nim',
    'lms',
    'llmops',
    'devops',
    'backend',
    'frontend',
    'genai',
    'iast',
    'sanskrit',
    'transliteration',
    // build/test vocabulary
    'clippy',
    'lexer',
    'parser',
    'bytecode',
    'evals',
    'eval',
    'scorers',
    'devel',
    'canary',
    'containerized',
    'repls',
    'harness',
    'golden',
    'snapshot',
    'lint',
    'gate',
    'gates',
    'manifest',
    'manifests',
    'orchestrator',
    'audited',
    'reversible',
    'permissioned',
    'offline',
    'multiplexing',
    'telemetry',
  ].map((w) => w.toLowerCase()),
)

function isTechy(token) {
  const t = token.trim()
  if (t.length < 3) return true
  if (/[-_/.:]/.test(t)) return true // hyphenated/slashed compounds: shesh-ecosystem, phi4-mini, eval_harness
  if (/\d/.test(t)) return true // version/model tokens: phi4, qwen2.5-coder:3b, Tier1, 20128
  if (/^[A-Z]{2,}$/.test(t)) return true // ALL-CAPS acronyms: MCP, RAG, PTY, SSH
  if (/[a-z][A-Z]/.test(t) && /[A-Z][a-z]/.test(t)) return true // CamelCase: LiteLLM, OmniRoute
  if (ALLOWLIST.has(t.toLowerCase())) return true
  return false
}

function chunks(text) {
  const out = []
  let cur = ''
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    if ((cur + sentence).length > MAX_BYTES && cur) {
      out.push(cur)
      cur = sentence
    } else {
      cur += (cur ? ' ' : '') + sentence
    }
  }
  if (cur) out.push(cur)
  return out
}

let typos = 0
let advisory = 0
let sawAny = false

async function checkText(label, text) {
  for (const [i, chunk] of chunks(text).entries()) {
    const body = new URLSearchParams({ text: chunk, language: 'en-US' })
    const res = await fetch(LT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!res.ok) throw new Error(`LanguageTool HTTP ${res.status}`)
    const data = await res.json()
    for (const m of data.matches || []) {
      const token = chunk.slice(m.offset, m.offset + m.length)
      if (isTechy(token)) continue
      const cat = (m.rule && m.rule.category && m.rule.category.id) || 'UNKNOWN'
      const ctx = chunk
        .slice(Math.max(0, m.offset - 40), m.offset + m.length + 40)
        .replace(/\s+/g, ' ')
      console.log(
        `[${cat}] ${label}: ${m.message} → "…${ctx}…" (suggest: ${
          (m.replacements || [])
            .slice(0, 3)
            .map((r) => r.value)
            .join(', ') || '—'
        })`,
      )
      sawAny = true
      if (cat === 'TYPOS') typos += 1
      else advisory += 1
    }
  }
}

const inputs = [
  ['resume.html', stripHtml(read('public/resume.html'))],
  [
    'projects.ts (descriptions)',
    [...read('src/data/projects.ts').matchAll(/description:\s*'([^']+)'/g)]
      .map((m) => m[1])
      .join('. '),
  ],
]

for (const [label, text] of inputs) {
  await checkText(label, text)
}

const strict = process.argv.includes('--strict')

if (!sawAny && typos === 0 && advisory === 0) {
  console.log('No grammar/style findings at all.')
}
console.log(
  `\n${typos} spelling note(s) survived the tech-term filter; ${advisory} advisory grammar/style note(s).`,
)
if (strict && typos > 0) {
  console.error('--strict: spelling errors are blocking.')
  process.exit(1)
}
console.log('Grammar pass is advisory (not blocking). Use --strict to make surviving TYPOS block.')
