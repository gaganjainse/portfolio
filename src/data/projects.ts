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

// AUTO-GENERATED — do not edit manually, run npm run update:projects
// Generated: 2026-08-11T11:56:14.035Z from GitHub API gaganjainse
// Source: 41 repos filtered from 20 total, top 20
export const PROJECTS: Project[] = [
  {
    "title": "shesh-ecosystem",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Federated, local-first AI body (Brain+Mind+Soma) for CachyOS/Hyprland — orchestrator, manifests, gates",
    "bullets": [
      "Federated, local-first AI body (Brain+Mind+Soma) for CachyOS/Hyprland — orchestrator, manifests, gates",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-ecosystem",
    "docs": "/docs/projects/shesh-ecosystem"
  },
  {
    "title": "shesh-omniroute",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Shesh wrapper for OmniRoute — free MIT gateway 291 providers 90+ free 500+ models, optional to local Ollama primary in final Shesh product, where enable is user choice. Forked from diegosouzapw/OmniRoute",
    "bullets": [
      "Shesh wrapper for OmniRoute — free MIT gateway 291 providers 90+ free 500+ models, optional to local Ollama primary in final Shesh product, where enable is user choice. Forked from diegosouzapw/OmniRoute",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-omniroute",
    "docs": "/docs/projects/shesh-omniroute"
  },
  {
    "title": "OmniRoute",
    "featured": true,
    "tag": "AI GATEWAY",
    "tagColor": "primary",
    "description": "Never stop coding. Free MIT AI gateway: one endpoint, 290+ providers (90+ free), 500+ models — Kimi, Claude, GPT, OpenAI, Gemini, GLM, DeepSeek, MiniMax. Works with Claude Code, Codex, Cursor, OpenCode, Cline & Copilot. Quota-aware auto-fallback, RTK+Caveman compression saves 15-95% tokens, MCP/A2A, Desktop/PWA. Built by 500+ contributors",
    "bullets": [
      "Never stop coding. Free MIT AI gateway: one endpoint, 290+ providers (90+ free), 500+ models — Kimi, Claude, GPT, OpenAI, Gemini, GLM, DeepSeek, MiniMax. Works with Claude Code, Codex, Cursor, OpenCode, Cline & Copilot. Quota-aware auto-fallback, RTK+Caveman compression saves 15-95% tokens, MCP/A2A, Desktop/PWA. Built by 500+ contributors"
    ],
    "tech": [
      "Open Source"
    ],
    "tests": 0,
    "github": "https://github.com/gaganjainse/OmniRoute"
  },
  {
    "title": "shesh-orchestrator",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Sesha Mind: multi-agent RLM runtime with role routing, A2A bus, and budgeted autonomy",
    "bullets": [
      "Sesha Mind: multi-agent RLM runtime with role routing, A2A bus, and budgeted autonomy",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-orchestrator",
    "docs": "/docs/projects/shesh-orchestrator"
  },
  {
    "title": "shesh-memory",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Sesha Mind: hierarchical memory, habit learning, and token-bounded context assembly",
    "bullets": [
      "Sesha Mind: hierarchical memory, habit learning, and token-bounded context assembly",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-memory",
    "docs": "/docs/projects/shesh-memory"
  },
  {
    "title": "shesh-desktop",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Usability-first Hyprland dotfiles with automated desktop environment setup for Arch-based systems.",
    "bullets": [
      "Usability-first Hyprland dotfiles with automated desktop environment setup for Arch-based systems.",
      "Primary language: QML",
      "Topics: arch-linux, dotfiles, hyprland, linux, ricing",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "QML",
      "arch-linux",
      "dotfiles",
      "hyprland",
      "linux",
      "ricing",
      "Shesh",
      "MCP"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-desktop",
    "docs": "/docs/projects/shesh-desktop"
  },
  {
    "title": "shesh-voice",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Newelle - Your Ultimate Virtual Assistant",
    "bullets": [
      "Newelle - Your Ultimate Virtual Assistant",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-voice",
    "docs": "/docs/projects/shesh-voice"
  },
  {
    "title": "shesh-mind",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Shesha Mind: role-to-model routing for the 6GB local LLM stack",
    "bullets": [
      "Shesha Mind: role-to-model routing for the 6GB local LLM stack",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-mind",
    "docs": "/docs/projects/shesh-mind"
  },
  {
    "title": "shesh-audit",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Shesha Brain: append-only hash-chained audit log and policy gate",
    "bullets": [
      "Shesha Brain: append-only hash-chained audit log and policy gate",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-audit",
    "docs": "/docs/projects/shesh-audit"
  },
  {
    "title": "llm-eval-harness",
    "featured": true,
    "tag": "Gen AI",
    "tagColor": "primary",
    "description": "Golden-set LLM evaluation harness: faithfulness, answer relevance, and correctness with LLM-as-judge and offline fallbacks. CI-ready reports.",
    "bullets": [
      "Golden-set LLM evaluation harness: faithfulness, answer relevance, and correctness with LLM-as-judge and offline fallbacks. CI-ready reports.",
      "Primary language: Python",
      "Topics: ci, evals, golden-set, llm-as-judge, llm-evaluation"
    ],
    "tech": [
      "Python",
      "ci",
      "evals",
      "golden-set",
      "llm-as-judge",
      "llm-evaluation"
    ],
    "tests": 0,
    "github": "https://github.com/gaganjainse/llm-eval-harness"
  },
  {
    "title": "rag-service",
    "featured": true,
    "tag": "Gen AI",
    "tagColor": "primary",
    "description": "Production RAG API: hybrid retrieval (dense embeddings + BM25, fused with Reciprocal Rank Fusion) over ChromaDB, with FastAPI and grounded answers with citations.",
    "bullets": [
      "Production RAG API: hybrid retrieval (dense embeddings + BM25, fused with Reciprocal Rank Fusion) over ChromaDB, with FastAPI and grounded answers with citations.",
      "Primary language: Python",
      "Topics: chromadb, docker, embeddings, fastapi, genai"
    ],
    "tech": [
      "Python",
      "chromadb",
      "docker",
      "embeddings",
      "fastapi",
      "genai"
    ],
    "tests": 0,
    "github": "https://github.com/gaganjainse/rag-service"
  },
  {
    "title": "AIM",
    "featured": true,
    "tag": "PRODUCTION-READY",
    "tagColor": "green",
    "description": "Full-stack attendance management system built with Flask and MySQL. Features Argon2id hashing, CSRF protection, Prometheus metrics, and 84 automated tests.",
    "bullets": [
      "Full-stack attendance management system built with Flask and MySQL. Features Argon2id hashing, CSRF protection, Prometheus metrics, and 84 automated tests.",
      "Primary language: Python",
      "1 stars, updated 8/8/2026",
      "Topics: attendance, ci-cd, docker, flask, mysql"
    ],
    "tech": [
      "Python",
      "attendance",
      "ci-cd",
      "docker",
      "flask",
      "mysql"
    ],
    "tests": 0,
    "github": "https://github.com/gaganjainse/AIM"
  },
  {
    "title": "FWRS",
    "featured": true,
    "tag": "PRODUCTION-READY",
    "tagColor": "green",
    "description": "Optimizes surplus food allocation to NGOs using 3-stage linear programming (fairness → priority → cost). Python, PuLP, Flask, Folium.",
    "bullets": [
      "Optimizes surplus food allocation to NGOs using 3-stage linear programming (fairness → priority → cost). Python, PuLP, Flask, Folium.",
      "Primary language: HTML",
      "1 stars, updated 7/11/2026",
      "Topics: docker, flask, folium, linear-programming, optimization"
    ],
    "tech": [
      "HTML",
      "docker",
      "flask",
      "folium",
      "linear-programming",
      "optimization"
    ],
    "tests": 0,
    "github": "https://github.com/gaganjainse/FWRS"
  },
  {
    "title": "Vyakrti",
    "featured": true,
    "tag": "FLAGSHIP",
    "tagColor": "primary",
    "description": "Sanskrit-oriented programming language with complete compiler pipeline (lexer, parser, type checker, bytecode) and browser-based IDE.",
    "bullets": [
      "Sanskrit-oriented programming language with complete compiler pipeline (lexer, parser, type checker, bytecode) and browser-based IDE.",
      "Primary language: Rust",
      "1 stars, updated 7/11/2026",
      "Topics: axum, compiler, programming-language, react, rust"
    ],
    "tech": [
      "Rust",
      "axum",
      "compiler",
      "programming-language",
      "react",
      "rust"
    ],
    "tests": 0,
    "github": "https://github.com/gaganjainse/Vyakrti"
  },
  {
    "title": "shesh-workspace",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Messy workspace handling session protocol, swarm, secure PAT, efficiency, dev tooling for shesh-ecosystem — keeps ecosystem repo clean",
    "bullets": [
      "Messy workspace handling session protocol, swarm, secure PAT, efficiency, dev tooling for shesh-ecosystem — keeps ecosystem repo clean",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-workspace",
    "docs": "/docs/projects/shesh-workspace"
  },
  {
    "title": "shesh-media",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Shesh shesh-media — shesh-media tools for Soma layer, part of shesh-ecosystem federation",
    "bullets": [
      "Shesh shesh-media — shesh-media tools for Soma layer, part of shesh-ecosystem federation",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-media",
    "docs": "/docs/projects/shesh-media"
  },
  {
    "title": "shesh-brain",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Packaged SheshaAOS kernel for desktop — routes tool calls through policy Guard, brain layer",
    "bullets": [
      "Packaged SheshaAOS kernel for desktop — routes tool calls through policy Guard, brain layer",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-brain",
    "docs": "/docs/projects/shesh-brain"
  },
  {
    "title": "shesh-messaging",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Shesh shesh-messaging — shesh-messaging tools for Soma layer, part of shesh-ecosystem federation",
    "bullets": [
      "Shesh shesh-messaging — shesh-messaging tools for Soma layer, part of shesh-ecosystem federation",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-messaging",
    "docs": "/docs/projects/shesh-messaging"
  },
  {
    "title": "shesh-containers",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Shesha Soma: podman/distrobox sandboxed command execution over MCP",
    "bullets": [
      "Shesha Soma: podman/distrobox sandboxed command execution over MCP",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-containers",
    "docs": "/docs/projects/shesh-containers"
  },
  {
    "title": "shesh-harness",
    "featured": true,
    "tag": "SHESH",
    "tagColor": "pink",
    "description": "Sesha Mind: Continual Harness for safe evidence-backed self-improvement",
    "bullets": [
      "Sesha Mind: Continual Harness for safe evidence-backed self-improvement",
      "Primary language: Python",
      "Part of Shesh ecosystem — federated AI body for CachyOS/Hyprland, brain/mind/soma layers"
    ],
    "tech": [
      "Python",
      "Shesh",
      "MCP",
      "Rust/Python"
    ],
    "tests": 8,
    "github": "https://github.com/gaganjainse/shesh-harness",
    "docs": "/docs/projects/shesh-harness"
  }
]
