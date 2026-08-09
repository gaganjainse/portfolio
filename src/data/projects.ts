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

export const PROJECTS: Project[] = [
  {
    title: 'NexusAOS',
    featured: true,
    tag: 'AI/AGENTIC',
    tagColor: 'pink',
    description:
      'Governance-first, event-sourced AI operating environment in Rust — 12 workspace crates, 981 tests, provider-agnostic LLM streaming.',
    bullets: [
      'Designed a governance-first, event-sourced AI OS in Rust: 12 workspace crates, 981 passing tests, 0 clippy warnings, full GitHub Actions CI/CD',
      'Built a policy-enforced agent kernel where LLMs propose actions and the kernel validates and records every state change in an append-only audit trail',
      'Implemented a provider-agnostic LLM layer with OpenAI-compatible and Anthropic streaming, LiteLLM routing, and local-first inference that runs fully offline',
      'Delivered native terminal emulation (PTY + VT100), SSH multiplexing, a secrets vault, and four interfaces: CLI, TUI, GUI, RPC',
    ],
    tech: [
      'Rust',
      'Tokio',
      'Event Sourcing',
      'LiteLLM',
      'OpenAI',
      'Anthropic',
      'SSH',
      'PTY',
      'TUI',
      'GUI',
    ],
    tests: 981,
    github: `${GITHUB_BASE}/NexusAOS`,
    docs: '/docs/projects/nexusaos',
  },
  {
    title: 'nexus-kernel',
    tag: 'AI/AGENTIC',
    tagColor: 'pink',
    companionOf: 'NexusAOS',
    description:
      'Companion repo to NexusAOS — the alpha-track sibling of the same 12-crate Rust workspace, focused on the microkernel layer (event-sourced governance, provider-swappable model interface).',
    bullets: [
      'Companion to NexusAOS: shares the same 12-crate Rust workspace and its 981-test suite (tracked under NexusAOS)',
      'Implemented event-sourced append-only audit trail, policy engine with trust tiers, and provider-swappable model interface',
      'Integrated OpenAI-compatible and Anthropic streaming with real-time token streaming into TUI/GUI',
      'Delivered native terminal emulation (PTY + VT100 + Zig parser), SSH multiplexing, and multi-interface CLI/TUI/GUI/RPC',
    ],
    tech: [
      'Rust',
      'Tokio',
      'OpenAI',
      'Anthropic',
      'SQLite',
      'Ratatui',
      'Iced',
      'SSH',
      'Event Sourcing',
    ],
    tests: 0,
    github: `${GITHUB_BASE}/nexus-kernel`,
    docs: '/docs/projects/nexus-kernel',
  },
  {
    title: 'SeshaOS',
    featured: true,
    tag: 'AI/AGENTIC',
    tagColor: 'pink',
    description:
      'NexusAOS v2 — governance-first, local-first AI OS with specialist local models and LiteLLM-compatible routing.',
    bullets: [
      'Architected specialist model stack: Gemma 4 12B (Planner), Qwen3-Coder 30B (Implementation), Qwen3.5 9B (Vision)',
      'Designed kernel-centric governance where models propose actions and the kernel validates/records every state change',
      'Built a LiteLLM-compatible proxy for NVIDIA NIM and other model providers',
      'Maintained event-sourced architecture with reversible, permissioned actions and offline-first execution',
    ],
    tech: [
      'Rust',
      'LiteLLM',
      'Gemma',
      'Qwen',
      'Local LLMs',
      'Governance',
      'Event Sourcing',
      'Ubuntu',
    ],
    tests: 0,
    github: `${GITHUB_BASE}/SeshaOS`,
    docs: '/docs/projects/seshaos',
  },
  {
    title: 'Vyākṛti',
    featured: true,
    tag: 'FLAGSHIP',
    tagColor: 'primary',
    description:
      'Sanskrit-oriented programming language with complete compiler pipeline and browser-based IDE. 123 tests.',
    bullets: [
      'Complete compiler pipeline: lexer → parser → type checker → bytecode compiler — all built from scratch in Rust',
      'Browser-based IDE with React, Monaco Editor, syntax highlighting, autocomplete, and diagnostics',
      'Rust (axum) backend with compile, REPL, LSP, and file management endpoints via REST + WebSocket',
      '123 tests covering the full pipeline, including a self-hosting corpus',
    ],
    tech: ['Rust', 'React', 'TypeScript', 'Monaco Editor', 'Zustand', 'Tailwind CSS', 'Axum'],
    tests: 123,
    github: `${GITHUB_BASE}/Vyakrti`,
    docs: '/docs/projects/vyakrti',
  },
  {
    title: 'RAG Service — Production RAG + Vector Search',
    tag: 'Gen AI',
    tagColor: 'primary',
    featured: true,
    description:
      'Production RAG API service: hybrid retrieval (vector + keyword), embeddings, reranking-ready, and an LLM-as-judge eval harness.',
    bullets: [
      'Built a FastAPI RAG service with hybrid retrieval (dense embeddings + BM25 keyword, merged via Reciprocal Rank Fusion) over ChromaDB',
      'Implemented chunking strategies (recursive, semantic), embedding pipelines, and an /ask endpoint that streams grounded answers with citations',
      'Shipped LLM-as-judge evaluation harness (faithfulness, answer relevance, correctness) with golden-set CI gate and RAGAS-style reports',
      'Containerized with Docker Compose; OpenAI-compatible LLM interface with local-first fallback',
    ],
    tech: [
      'Python',
      'FastAPI',
      'ChromaDB',
      'Embeddings',
      'Hybrid Search',
      'RAG',
      'LLM-as-Judge',
      'Docker',
    ],
    tests: 28,
    github: `${GITHUB_BASE}/rag-service`,
    docs: '/docs/projects/rag-service',
  },
  {
    title: 'LLM Eval Harness',
    tag: 'Gen AI',
    tagColor: 'primary',
    featured: true,
    description:
      'Reusable LLM evaluation harness: golden-set YAML, LLM-as-judge metrics, offline heuristic fallbacks, and CI-ready reports.',
    bullets: [
      'Built a golden-set-driven evaluation harness with faithfulness, answer-relevance, and correctness metrics (LLM-as-judge + lexical fallbacks)',
      'Added offline heuristic scorers so evals run in CI without API keys; JSON + Markdown reports for regression tracking',
      'Designed golden-set YAML format (question, golden answer, context) and a CLI: python -m eval_harness --golden-set ...',
      'Containerized and CI-ready; used to gate the RAG service pipeline',
    ],
    tech: ['Python', 'LLM-as-Judge', 'Golden Sets', 'RAGAS', 'CLI', 'CI/CD', 'Pytest'],
    tests: 15,
    github: `${GITHUB_BASE}/llm-eval-harness`,
    docs: '/docs/projects/llm-eval-harness',
  },
  {
    title: 'AIM — Attendance Information Manager',
    featured: true,
    tag: 'PRODUCTION-READY',
    tagColor: 'green',
    description:
      'Production-grade Flask + MySQL platform with Argon2id auth, Prometheus monitoring, and CI/CD.',
    bullets: [
      'Production-grade Flask + MySQL platform with Argon2id auth, CSRF protection, brute-force lockout, breached-password scanning, JWT sessions, and strict CSP/HSTS headers',
      'Deployed Prometheus metrics, structured JSON logging, Chart.js analytics, FullCalendar scheduling, Docker Compose, and GitHub Actions CI/CD; 101 automated pytest tests',
    ],
    tech: ['Python', 'Flask', 'MySQL', 'Bootstrap', 'Chart.js', 'Docker', 'GitHub Actions'],
    tests: 101,
    github: `${GITHUB_BASE}/AIM`,
    docs: '/docs/projects/aim',
  },
  {
    title: 'FWRS — Food Waste Reduction System',
    tag: 'PRODUCTION-READY',
    tagColor: 'green',
    description:
      'Optimizes surplus-food allocation to NGOs with a 3-stage lexicographic linear program (fairness → priority → cost) and expiry-aware routing.',
    bullets: [
      'Built a 3-stage lexicographic LP solver (fairness → priority → cost) to allocate surplus food to NGOs while minimizing waste',
      'Added expiry-aware routing that penalizes allocations where travel time exceeds food shelf life',
      'Integrated Folium/Leaflet interactive maps with animated routes, heatmaps, and priority-colored markers',
      'Shipped a Flask web dashboard plus a desktop Tkinter GUI with charts and CSV export',
    ],
    tech: ['Python', 'PuLP', 'Folium', 'Flask', 'MySQL', 'Bootstrap'],
    tests: 1,
    github: `${GITHUB_BASE}/FWRS`,
    docs: '/docs/projects/fwrs',
  },
]
