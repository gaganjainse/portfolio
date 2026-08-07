const GITHUB_BASE = 'https://github.com/gaganjainse'

const TAG_CLASSES = {
  pink: 'bg-pink-500/20 text-pink-400 cursor-default hover:shadow-[0_0_8px_rgba(236,72,153,0.4)] hover:border-pink-500/50 transition-all',
  green: 'bg-green-500/20 text-green-400 cursor-default hover:shadow-[0_0_8px_rgba(16,185,129,0.4)] hover:border-green-500/50 transition-all',
  primary: 'bg-primary/20 text-primary-light cursor-default hover:shadow-[0_0_8px_rgba(124,58,237,0.4)] hover:border-primary/50 transition-all',
}

export function getTagClasses(tagColor) {
  return TAG_CLASSES[tagColor] || TAG_CLASSES.primary
}

export const PROJECTS = [
  {
    title: 'NexusAOS',
    tag: 'AI/AGENTIC',
    tagColor: 'pink',
    description: 'Governance-first agentic OS with multi-agent swarm orchestration, LLM fine-tuning, and 30+ MCP tools.',
    bullets: [
      'Built multi-agent swarm executor with collision detection, namespace isolation, quorum voting, and atomic fission in Python + asyncio',
      'Integrated local LLM inference with Phi-4-Mini QLoRA adapters, AB/AP balance enforcement, and constitution-guided routing',
      'Exposed 30+ MCP tools via FastMCP for metabolic, planning, immune, and physical substrate control',
      'Designed adapter-routed inference with curriculum learning, evaluation harness, and model benchmarking',
    ],
    tech: ['Python', 'FastMCP', 'QLoRA', 'Unsloth', 'Multi-Agent', 'MCP', 'AsyncIO', 'Rust', 'Zig'],
    github: `${GITHUB_BASE}/NexusAOS`,
  },
  {
    title: 'nexus-kernel',
    tag: 'AI/AGENTIC',
    tagColor: 'pink',
    description: 'Production-ready Rust microkernel for local-first AI with event-sourced governance, OpenAI/Anthropic streaming, and 981 tests.',
    bullets: [
      'Built Rust 2024 microkernel with 12 workspace crates, 981 passing tests, 0 clippy warnings, and full CI/CD',
      'Implemented event-sourced append-only audit trail, policy engine with trust tiers, and provider-swappable model interface',
      'Integrated OpenAI-compatible and Anthropic streaming with real-time token streaming into TUI/GUI',
      'Delivered native terminal emulation (PTY + VT100 + Zig parser), SSH multiplexing, and multi-interface CLI/TUI/GUI/RPC',
    ],
    tech: ['Rust', 'Tokio', 'OpenAI', 'Anthropic', 'SQLite', 'Ratatui', 'Iced', 'SSH', 'Event Sourcing'],
    github: `${GITHUB_BASE}/nexus-kernel`,
  },
  {
    title: 'SeshaOS',
    tag: 'AI/AGENTIC',
    tagColor: 'pink',
    description: 'NexusAOS v2 — governance-first, local-first AI OS with specialist local models and LiteLLM-compatible routing.',
    bullets: [
      'Architected specialist model stack: Gemma 4 12B (Planner), Qwen3-Coder 30B (Implementation), Qwen3.5 9B (Vision)',
      'Designed kernel-centric governance where models propose actions and the kernel validates/records every state change',
      'Implemented LiteLLM-compatible proxy support for NVIDIA NIM and other model providers',
      'Maintained event-sourced architecture with reversible, permissioned actions and offline-first execution',
    ],
    tech: ['Rust', 'LiteLLM', 'Gemma', 'Qwen', 'Local LLMs', 'Governance', 'Event Sourcing', 'Ubuntu'],
    github: `${GITHUB_BASE}/SeshaOS`,
  },
  {
    title: 'Vyākṛti',
    tag: 'FLAGSHIP',
    tagColor: 'primary',
    description: 'Sanskrit-oriented programming language with complete compiler pipeline and browser-based IDE. 123 tests.',
    bullets: [
      'Complete compiler pipeline: lexer → parser → type checker → bytecode compiler — all built from scratch in Rust',
      'Browser-based IDE with React, Monaco Editor, syntax highlighting, autocomplete, and diagnostics',
      'Rust (axum) backend with compile, REPL, LSP, and file management endpoints via REST + WebSocket',
      '123 tests covering the full pipeline, including a self-hosting corpus',
    ],
    tech: ['Rust', 'React', 'TypeScript', 'Monaco Editor', 'Zustand', 'Tailwind CSS', 'Axum'],
    github: `${GITHUB_BASE}/Vyakrti`,
  },
  {
    title: 'AIM — Attendance Information Manager',
    tag: 'PRODUCTION-READY',
    tagColor: 'green',
    description: 'Production-grade Flask + MySQL platform with Argon2id auth, Prometheus monitoring, and CI/CD.',
    bullets: [
      'Production-grade Flask + MySQL platform with Argon2id auth, CSRF protection, brute-force lockout, breached-password scanning, JWT sessions, and strict CSP/HSTS headers',
      'Deployed Prometheus metrics, structured JSON logging, Chart.js analytics, FullCalendar scheduling, Docker Compose, and GitHub Actions CI/CD; 101 automated pytest tests',
    ],
    tech: ['Python', 'Flask', 'MySQL', 'Bootstrap', 'Chart.js', 'Docker', 'GitHub Actions'],
    github: `${GITHUB_BASE}/AIM`,
  },
  {
    title: 'FWRS — Food Waste Reduction System',
    tag: 'PRODUCTION-READY',
    tagColor: 'green',
    description: 'Food waste optimization platform using linear programming and route optimization.',
    bullets: [
      'Built linear programming models to minimize food waste and optimize distribution routes',
      'Implemented route optimization algorithms for efficient collection and delivery scheduling',
      'Integrated Folium-based mapping and visualization for route planning and monitoring',
      'Deployed as a full-stack platform with real-time tracking and analytics dashboard',
    ],
    tech: ['Python', 'PuLP', 'Folium', 'Flask', 'MySQL', 'Bootstrap'],
    github: `${GITHUB_BASE}/FWRS`,
  },
]

