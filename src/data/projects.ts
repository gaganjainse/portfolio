const GITHUB_BASE = 'https://github.com/gaganjainse'

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
// Generated: 2026-08-13T14:37:12.223Z — no forks ever
export const PROJECTS: Project[] = [
  {
    title: 'SheshAOS',
    featured: true,
    tag: 'AI/AGENTIC OS',
    tagColor: 'pink',
    description:
      'Governance-first, event-sourced AI OS in Rust — 9 crates + CLI, 877+ tests, provider-agnostic LLM',
    bullets: [
      'Governance-first, event-sourced AI OS in Rust: 9 workspace crates + CLI, 877+ passing tests, 0 clippy warnings, full GitHub Actions CI/CD',
      'Policy-enforced agent kernel where LLMs propose actions and kernel validates/records every state change in append-only audit trail',
      'Provider-agnostic LLM layer with OpenAI-compatible and Anthropic streaming, LiteLLM routing, local-first inference fully offline',
      'Native terminal emulation (PTY + VT100), SSH multiplexing, secrets vault, 4 interfaces: CLI, TUI, GUI, RPC',
    ],
    tech: ['Rust', 'Tokio', 'Event Sourcing', 'LiteLLM', 'OpenAI', 'Anthropic', 'SSH'],
    tests: 877,
    github: 'https://github.com/gaganjainse/SheshAOS',
    docs: '/docs/projects/seshaos',
  },
  {
    title: 'shesh-ecosystem',
    featured: true,
    tag: 'AGENTIC BODY',
    tagColor: 'pink',
    description:
      'Federated, local-first AI body (Brain+Mind+Soma) for CachyOS/Hyprland — orchestrator, manifests, gates, 22 components',
    bullets: [
      'Federated, local-first AI body for CachyOS/Hyprland — Brain (governance kernel), Mind (models/planning/memory), Soma (sensors/actuators)',
      'Orchestrator manifest with 22 components, 3 channels stable/canary/devel, SHA256 audited locks, 63 ecosystem tests GATE OK',
      'Local-first: Ollama phi4-mini/qwen2.5-coder:3b/moondream2/nomic-embed-text 6GB VRAM offline, optional OmniRoute free big models gateway where user choice',
      'Governance: shesh-audit GuardedMCP policy allow/confirm/deny + hash-chained audit + Kernel bridge, swarm via GitHub Issues atomic lock',
    ],
    tech: ['Python', 'Rust', 'MCP', 'Agentic AI', 'Ollama', 'Governance'],
    tests: 63,
    github: 'https://github.com/gaganjainse/shesh-ecosystem',
    docs: '/docs/projects/shesh-ecosystem',
  },
  {
    title: 'Vyakrti',
    featured: true,
    tag: 'FLAGSHIP LANG',
    tagColor: 'primary',
    description: 'Sanskrit-oriented programming language with complete compiler pipeline',
    bullets: [
      'Complete compiler pipeline: lexer → parser → type checker → bytecode compiler — all built from scratch in Rust',
      'Browser-based IDE with React, Monaco Editor, syntax highlighting, autocomplete, diagnostics',
      'Rust (axum) backend with compile, REPL, LSP, file management via REST + WebSocket',
      '122 tests covering full pipeline, including self-hosting corpus',
    ],
    tech: ['Rust', 'React', 'TypeScript', 'Monaco', 'Axum'],
    tests: 122,
    github: 'https://github.com/gaganjainse/Vyakrti',
    docs: '/docs/projects/vyakrti',
  },
  {
    title: 'rag-service',
    featured: true,
    tag: 'RAG / VECTOR',
    tagColor: 'primary',
    description: 'FastAPI RAG with hybrid retrieval (dense + BM25, RRF)',
    bullets: [
      'FastAPI RAG service with hybrid retrieval (dense embeddings + BM25 keyword, merged via Reciprocal Rank Fusion) over ChromaDB',
      'Chunking strategies (recursive, semantic), embedding pipelines, /ask endpoint that streams grounded answers with citations',
      'LLM-as-judge evaluation harness (faithfulness, answer relevance, correctness) with golden-set CI gate',
      'Docker Compose, OpenAI-compatible LLM interface with local-first fallback',
    ],
    tech: ['Python', 'FastAPI', 'ChromaDB', 'RAG', 'Hybrid Search', 'LLM-as-Judge'],
    tests: 28,
    github: 'https://github.com/gaganjainse/rag-service',
    docs: '/docs/projects/rag-service',
  },
  {
    title: 'llm-eval-harness',
    featured: true,
    tag: 'LLM EVAL',
    tagColor: 'primary',
    description: 'Golden-set LLM evaluation harness — LLM-as-judge + lexical fallbacks',
    bullets: [
      'Golden-set-driven evaluation harness with faithfulness, answer-relevance, correctness metrics (LLM-as-judge + lexical fallbacks)',
      'Offline heuristic scorers so evals run in CI without API keys; JSON + Markdown reports',
      'Golden-set YAML format (question, golden answer, context) and CLI: python -m eval_harness',
      'Containerized and CI-ready; used to gate RAG service pipeline',
    ],
    tech: ['Python', 'LLM-as-Judge', 'Golden Sets', 'RAGAS', 'Pytest'],
    tests: 15,
    github: 'https://github.com/gaganjainse/llm-eval-harness',
    docs: '/docs/projects/llm-eval-harness',
  },
  {
    title: 'AIM',
    featured: true,
    tag: 'PRODUCTION',
    tagColor: 'green',
    description: 'Production Flask + MySQL platform — Argon2id auth, CSRF, JWT, Prometheus',
    bullets: [
      'Production-grade Flask + MySQL platform with Argon2id auth, CSRF protection, brute-force lockout, breached-password scanning, JWT sessions, strict CSP/HSTS',
      'Prometheus metrics, structured JSON logging, Chart.js analytics, FullCalendar scheduling, Docker Compose, GitHub Actions CI/CD; 101 automated pytest tests',
    ],
    tech: ['Python', 'Flask', 'MySQL', 'Bootstrap', 'Chart.js', 'Docker', 'GitHub Actions'],
    tests: 101,
    github: 'https://github.com/gaganjainse/AIM',
    docs: '/docs/projects/aim',
  },
  {
    title: 'FWRS',
    featured: true,
    tag: 'PRODUCTION',
    tagColor: 'green',
    description: 'Food waste redistribution — 3-stage lexicographic LP solver',
    bullets: [
      '3-stage lexicographic LP solver (fairness → priority → cost) to allocate surplus food to NGOs while minimizing waste',
      'Expiry-aware routing that penalizes allocations where travel time exceeds food shelf life',
      'Folium/Leaflet interactive maps with animated routes, heatmaps, priority-colored markers',
      'Flask web dashboard plus desktop Tkinter GUI with charts and CSV export',
    ],
    tech: ['Python', 'PuLP', 'Folium', 'Flask', 'MySQL'],
    tests: 1,
    github: 'https://github.com/gaganjainse/FWRS',
    docs: '/docs/projects/fwrs',
  },
  {
    title: 'shesh-omniroute',
    featured: true,
    tag: 'AI GATEWAY',
    tagColor: 'primary',
    description: 'Shesh wrapper for OmniRoute — free AI gateway (291 providers)',
    bullets: [
      'Shesh wrapper for OmniRoute — free MIT gateway 291 providers 90+ free 500+ models, optional to local Ollama primary in final Shesh product',
      '1.53B free tokens/month documented, RTK+Caveman compression 15-95% tokens (~89% avg) stretches free tiers',
      'One endpoint http://localhost:20128/v1 OpenAI-compatible — any tool (Claude Code, Cursor, Cline) points there, auto-fallback Tier1 Sub → Tier2 API → Tier3 Cheap → Tier4 Free',
      '19 routing strategies, 105 MCP tools, A2A v0.3, Desktop/PWA, 43 i18n, MIT self-hosted',
    ],
    tech: ['TypeScript', 'OmniRoute', 'AI Gateway', 'Free Models', 'MCP', 'A2A'],
    tests: 0,
    github: 'https://github.com/gaganjainse/shesh-omniroute',
    docs: '/docs/projects/shesh-omniroute',
  },
]
