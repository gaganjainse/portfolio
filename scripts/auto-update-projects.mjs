#!/usr/bin/env node
/**
 * Auto-update projects.ts — SMART, no forks, proper priority for AI/LLM portfolio
 * Understands portfolio IS personal site for AI/LLM Engineer, WHY: showcase production-grade GenAI
 * Proper order: flagship AI OS > GenAI production > production-ready
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GITHUB_USERNAME = 'gaganjainse'

const PRIORITY_ORDER = [
  'SheshAOS', // 1: Governance-first AI OS Rust 9 crates + CLI 877+ tests
  'shesh-ecosystem', // 2: Federated AI body 22 components — represents entire shesh family, not 10 separate cards
  'Vyakrti', // 3: Sanskrit programming language 123 tests — flagship lang
  'rag-service', // 4: Production RAG API hybrid retrieval
  'llm-eval-harness', // 5: LLM eval harness golden-set
  'AIM', // 6: Production Flask MySQL Argon2id 101 tests
  'FWRS', // 7: Food waste LP
  'shesh-omniroute', // 8: AI Gateway 291 providers free — optional to local
]

const ACCURATE_TESTS = {
  SheshAOS: 877,
  'shesh-ecosystem': 30,
  Vyakrti: 123,
  'rag-service': 28,
  'llm-eval-harness': 15,
  AIM: 101,
  FWRS: 1,
  'shesh-omniroute': 0,
}

// Legacy page slug for the renamed AI-OS repo (page filename still seshaos.mdx)
const DOCS_URLS = { SheshAOS: '/docs/projects/seshaos' }

const TAG_MAP = {
  SheshAOS: { tag: 'AI/AGENTIC OS', tagColor: 'pink' },
  'shesh-ecosystem': { tag: 'AGENTIC BODY', tagColor: 'pink' },
  Vyakrti: { tag: 'FLAGSHIP LANG', tagColor: 'primary' },
  'rag-service': { tag: 'RAG / VECTOR', tagColor: 'primary' },
  'llm-eval-harness': { tag: 'LLM EVAL', tagColor: 'primary' },
  AIM: { tag: 'PRODUCTION', tagColor: 'green' },
  FWRS: { tag: 'PRODUCTION', tagColor: 'green' },
  'shesh-omniroute': { tag: 'AI GATEWAY', tagColor: 'primary' },
}

function getTagInfo(name) {
  return TAG_MAP[name] || { tag: 'OPEN SOURCE', tagColor: 'primary' }
}

async function fetchRepos() {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-auto' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  let all = []
  let page = 1
  while (true) {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`
    const res = await fetch(url, { headers })
    if (!res.ok) break
    const repos = await res.json()
    if (repos.length === 0) break
    all.push(...repos)
    if (repos.length < 100) break
    page++
  }
  return all
}

async function main() {
  const repos = await fetchRepos()
  console.log(`Fetched ${repos.length} repos`)

  const filtered = repos.filter((r) => {
    if (['gaganjainse', 'portfolio'].includes(r.name)) return false
    if (r.private || r.archived) return false
    if (r.fork) {
      console.log(`Skipping fork: ${r.name}`)
      return false
    }
    return true
  })
  console.log(`Filtered no-forks to ${filtered.length}`)

  const byName = new Map(filtered.map((r) => [r.name.toLowerCase(), r]))
  let ordered = []
  for (const name of PRIORITY_ORDER) {
    const repo = byName.get(name.toLowerCase())
    if (repo) ordered.push(repo)
  }

  console.log(
    `Final curated ${ordered.length} in proper priority order (no forks, flagship first):`,
  )
  ordered.forEach((r, i) =>
    console.log(
      `${i + 1}. ${r.name} stars=${r.stargazers_count} lang=${r.language} tests=${ACCURATE_TESTS[r.name] || 0}`,
    ),
  )

  const projects = ordered.map((repo) => {
    const tagInfo = getTagInfo(repo.name)
    const tests = ACCURATE_TESTS[repo.name] ?? 0

    let bullets = []
    let description = repo.description || `${repo.name} — project by Gagan Jain`
    let tech = []

    if (repo.name === 'shesh-ecosystem') {
      description =
        'Federated, local-first AI body (Brain+Mind+Soma) for CachyOS/Hyprland — orchestrator, manifests, gates, 22 components'
      bullets = [
        'Federated, local-first AI body for CachyOS/Hyprland — Brain (governance kernel), Mind (models/planning/memory), Soma (sensors/actuators)',
        'Orchestrator manifest with 22 components, 3 channels stable/canary/devel, SHA256 audited locks, 30 ecosystem tests GATE OK',
        'Local-first: Ollama phi4-mini/qwen2.5-coder:3b/moondream2/nomic-embed-text 6GB VRAM offline, optional OmniRoute free big models gateway where user choice',
        'Governance: shesh-audit GuardedMCP policy allow/confirm/deny + hash-chained audit + Kernel bridge, swarm via GitHub Issues atomic lock',
      ]
      tech = ['Python', 'Rust', 'MCP', 'Agentic AI', 'Ollama', 'Governance']
    } else if (repo.name === 'SheshAOS') {
      description =
        'Governance-first, event-sourced AI OS in Rust — 9 crates + CLI, 877+ tests, provider-agnostic LLM'
      bullets = [
        'Governance-first, event-sourced AI OS in Rust: 9 workspace crates + CLI, 877+ passing tests, 0 clippy warnings, full GitHub Actions CI/CD',
        'Policy-enforced agent kernel where LLMs propose actions and kernel validates/records every state change in append-only audit trail',
        'Provider-agnostic LLM layer with OpenAI-compatible and Anthropic streaming, LiteLLM routing, local-first inference fully offline',
        'Native terminal emulation (PTY + VT100), SSH multiplexing, secrets vault, 4 interfaces: CLI, TUI, GUI, RPC',
      ]
      tech = ['Rust', 'Tokio', 'Event Sourcing', 'LiteLLM', 'OpenAI', 'Anthropic', 'SSH']
    } else if (repo.name.toLowerCase() === 'vyakrti') {
      bullets = [
        'Complete compiler pipeline: lexer → parser → type checker → bytecode compiler — all built from scratch in Rust',
        'Browser-based IDE with React, Monaco Editor, syntax highlighting, autocomplete, diagnostics',
        'Rust (axum) backend with compile, REPL, LSP, file management via REST + WebSocket',
        '123 tests covering full pipeline, including self-hosting corpus',
      ]
      tech = ['Rust', 'React', 'TypeScript', 'Monaco', 'Axum']
    } else if (repo.name === 'rag-service') {
      bullets = [
        'FastAPI RAG service with hybrid retrieval (dense embeddings + BM25 keyword, merged via Reciprocal Rank Fusion) over ChromaDB',
        'Chunking strategies (recursive, semantic), embedding pipelines, /ask endpoint that streams grounded answers with citations',
        'LLM-as-judge evaluation harness (faithfulness, answer relevance, correctness) with golden-set CI gate',
        'Docker Compose, OpenAI-compatible LLM interface with local-first fallback',
      ]
      tech = ['Python', 'FastAPI', 'ChromaDB', 'RAG', 'Hybrid Search', 'LLM-as-Judge']
    } else if (repo.name === 'llm-eval-harness') {
      bullets = [
        'Golden-set-driven evaluation harness with faithfulness, answer-relevance, correctness metrics (LLM-as-judge + lexical fallbacks)',
        'Offline heuristic scorers so evals run in CI without API keys; JSON + Markdown reports',
        'Golden-set YAML format (question, golden answer, context) and CLI: python -m eval_harness',
        'Containerized and CI-ready; used to gate RAG service pipeline',
      ]
      tech = ['Python', 'LLM-as-Judge', 'Golden Sets', 'RAGAS', 'Pytest']
    } else if (repo.name === 'AIM') {
      bullets = [
        'Production-grade Flask + MySQL platform with Argon2id auth, CSRF protection, brute-force lockout, breached-password scanning, JWT sessions, strict CSP/HSTS',
        'Prometheus metrics, structured JSON logging, Chart.js analytics, FullCalendar scheduling, Docker Compose, GitHub Actions CI/CD; 101 automated pytest tests',
      ]
      tech = ['Python', 'Flask', 'MySQL', 'Bootstrap', 'Chart.js', 'Docker', 'GitHub Actions']
    } else if (repo.name === 'FWRS') {
      bullets = [
        '3-stage lexicographic LP solver (fairness → priority → cost) to allocate surplus food to NGOs while minimizing waste',
        'Expiry-aware routing that penalizes allocations where travel time exceeds food shelf life',
        'Folium/Leaflet interactive maps with animated routes, heatmaps, priority-colored markers',
        'Flask web dashboard plus desktop Tkinter GUI with charts and CSV export',
      ]
      tech = ['Python', 'PuLP', 'Folium', 'Flask', 'MySQL']
    } else if (repo.name === 'shesh-omniroute') {
      bullets = [
        'Shesh wrapper for OmniRoute — free MIT gateway 291 providers 90+ free 500+ models, optional to local Ollama primary in final Shesh product',
        '1.53B free tokens/month documented, RTK+Caveman compression 15-95% tokens (~89% avg) stretches free tiers',
        'One endpoint http://localhost:20128/v1 OpenAI-compatible — any tool (Claude Code, Cursor, Cline) points there, auto-fallback Tier1 Sub → Tier2 API → Tier3 Cheap → Tier4 Free',
        '19 routing strategies, 105 MCP tools, A2A v0.3, Desktop/PWA, 43 i18n, MIT self-hosted',
      ]
      tech = ['TypeScript', 'OmniRoute', 'AI Gateway', 'Free Models', 'MCP', 'A2A']
    } else {
      if (repo.description) bullets.push(repo.description)
    }

    return {
      title: repo.name,
      featured: true,
      tag: tagInfo.tag,
      tagColor: tagInfo.tagColor,
      description,
      bullets: bullets.slice(0, 4),
      tech: tech.slice(0, 8),
      tests,
      github: repo.html_url,
      docs: DOCS_URLS[repo.name] || `/docs/projects/${repo.name.toLowerCase()}`,
    }
  })

  const tsContent = `const GITHUB_BASE = 'https://github.com/${GITHUB_USERNAME}'

export type TagColor = 'pink' | 'green' | 'primary'

export interface Project {
  title: string
  tag: string
  tagColor: TagColor
  description: string
  bullets: string[]
  tech: string[]
  tests: number
  github: string
  docs?: string
  featured?: boolean
  companionOf?: string
}

const TAG_CLASSES: Record<TagColor, string> = {
  pink: 'bg-pink-500/20 text-pink-400 cursor-default hover:shadow-[0_0_8px_rgba(236,72,153,0.4)] hover:border-pink-500/50 transition',
  green:
    'bg-green-500/20 text-green-400 cursor-default hover:shadow-[0_0_8px_rgba(16,185,129,0.4)] hover:border-green-500/50 transition',
  primary:
    'bg-primary/20 text-primary-light cursor-default hover:shadow-[0_0_8px_rgba(124,58,237,0.4)] hover:border-primary/50 transition',
}

export function getTagClasses(tagColor: string): string {
  return TAG_CLASSES[tagColor as TagColor] || TAG_CLASSES.primary
}

// AUTO-GENERATED SMART — no forks, proper priority for AI/LLM portfolio
// Portfolio IS personal site for AI/LLM Engineer — WHY: showcase production-grade GenAI systems
// Priority: SheshAOS (AI OS 877+) > shesh-ecosystem (federated body 22 comps) > Vyakrti (lang 123) > RAG/Eval > AIM/FWRS > omniroute
// Generated: ${new Date().toISOString()} — no forks ever
export const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)}
`

  const outPath = path.join(__dirname, '../src/data/projects.ts')
  fs.writeFileSync(outPath, tsContent)
  console.log(`Wrote ${outPath} with ${projects.length} curated — no forks, proper priority`)

  const jsonPath = path.join(__dirname, '../public/projects.json')
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        count: projects.length,
        repos: projects.map((p) => ({ title: p.title, tests: p.tests })),
      },
      null,
      2,
    ),
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
