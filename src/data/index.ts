export interface Project {
  name: string;
  tag: string;
  description: string;
  details?: string[];
  stack: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  image?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const SITE_CONFIG = {
  name: "Gagan Jain",
  title: "AI / LLM Engineer",
  tagline: "CS @ VIT Vellore building GenAI, LLM, and agentic AI systems — from RAG pipelines and fine-tuned models to multi-agent orchestration and production AI platforms.",
  description: "I build practical AI systems: LLM-powered apps, RAG pipelines, autonomous agents, and production-ready GenAI platforms. Strong Python foundation with end-to-end deployment experience.",
  email: "gagan.jain.se@gmail.com",
  location: "Jaipur, Rajasthan, India",
  availability: "Open to AI/LLM roles · Open to relocation",
  graduation: "2026",
  cgpa: "7.7+/10",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/gaganjainse", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/gaganjainse", icon: "linkedin" },
  { name: "Email", url: "mailto:gagan.jain.se@gmail.com", icon: "email" },
];

export const PROJECTS: Project[] = [
  {
    name: "NexusAOS",
    tag: "AI/AGENTIC",
    description: "Governance-first agentic operating system with multi-agent swarm orchestration, LLM integration, and MCP tooling.",
    details: [
      "Built multi-agent swarm executor with collision detection, namespace isolation, quorum voting, and atomic fission in Python + asyncio",
      "Integrated local LLM inference pipeline with Phi-4-Mini QLoRA adapters, AB/AP balance enforcement, and constitution-guided routing",
      "Exposed 30+ MCP tools via FastMCP for metabolic, planning, immune, and physical substrate control",
      "Designed adapter-routed inference system with curriculum learning, evaluation harness, and model benchmarking",
    ],
    stack: ["Python", "FastMCP", "LLM Fine-tuning", "QLoRA", "Unsloth", "Multi-Agent", "MCP", "AsyncIO", "Rust", "Zig"],
    github: "https://github.com/gaganjainse/NexusAOS",
    featured: true,
  },
  {
    name: "nexus-kernel",
    tag: "AI/AGENTIC",
    description: "Governance-first, event-sourced AI operating environment for Ubuntu Linux with local LLM inference and policy enforcement.",
    details: [
      "Built Rust 2024 microkernel with 12 workspace crates, 981 passing tests, 0 clippy warnings, and full CI/CD",
      "Implemented event-sourced append-only audit trail, policy engine with trust tiers, and provider-swappable model interface",
      "Integrated OpenAI-compatible and Anthropic streaming with real-time token streaming into TUI/GUI",
      "Delivered native terminal emulation (PTY + VT100 + Zig parser), SSH multiplexing, and multi-interface CLI/TUI/GUI/RPC",
    ],
    stack: ["Rust", "Tokio", "OpenAI", "Anthropic", "SQLite", "Ratatui", "Iced", "SSH", "Event Sourcing", "Policy Engine"],
    github: "https://github.com/gaganjainse/nexus-kernel",
    featured: true,
  },
  {
    name: "SeshaOS",
    tag: "AI/AGENTIC",
    description: "NexusAOS v2 — governance-first, local-first AI OS with specialist local models and LiteLLM-compatible routing.",
    details: [
      "Architected specialist model stack: Gemma 4 12B (Planner), Qwen3-Coder 30B (Implementation), Qwen3.5 9B (Vision)",
      "Designed kernel-centric governance where models propose actions and the kernel validates/records every state change",
      "Implemented LiteLLM-compatible proxy support for NVIDIA NIM and other model providers",
      "Maintained event-sourced architecture with reversible, permissioned actions and offline-first execution",
    ],
    stack: ["Rust", "LiteLLM", "Gemma", "Qwen", "Local LLMs", "Governance", "Event Sourcing", "Ubuntu"],
    github: "https://github.com/gaganjainse/SeshaOS",
    featured: true,
  },
  {
    name: "Vyākṛti",
    tag: "FLAGSHIP",
    description: "Sanskrit-oriented programming language with complete compiler pipeline and browser-based IDE.",
    details: [
      "Complete compiler pipeline: lexer → parser → type checker → bytecode compiler — all built from scratch in Rust",
      "Browser-based IDE with React, Monaco Editor, syntax highlighting, autocomplete, and diagnostics",
      "Rust (axum) backend with compile, REPL, LSP, and file management endpoints via REST + WebSocket",
      "123 tests covering the full pipeline, including a self-hosting corpus",
    ],
    stack: ["Rust", "React", "TypeScript", "Monaco Editor", "Zustand", "Tailwind CSS", "Axum"],
    github: "https://github.com/gaganjainse/Vyakrti",
    demo: "https://vyakrti.vercel.app",
    featured: true,
  },
  {
    name: "vyakrti-ide",
    tag: "FLAGSHIP",
    description: "Standalone browser-based IDE for Vyākṛti with Monaco Editor, AST/token/bytecode viewers, and WebSocket REPL.",
    details: [
      "Monaco-powered editor with custom syntax highlighting for Sanskrit-oriented language",
      "File management: create, rename, delete .vya files with persistent storage",
      "WebSocket REPL integration for real-time compile/run feedback",
      "AST, Tokens, and Bytecode viewer panels with diagnostics console",
    ],
    stack: ["React", "TypeScript", "Monaco Editor", "Vite", "Tailwind CSS", "WebSocket"],
    github: "https://github.com/gaganjainse/vyakrti-ide",
    demo: "https://vyakrti-ide.vercel.app",
    featured: false,
  },
  {
    name: "AIM",
    tag: "PRODUCTION-READY",
    description: "Production-grade attendance management system with security, monitoring, and CI/CD.",
    details: [
      "Argon2id auth (OWASP 2025), CSRF protection, brute-force lockout, breached-password detection",
      "Reporting with Chart.js, FullCalendar, light/dark themes, CSV import/export, encrypted backups",
      "Prometheus monitoring, 101 tests, Docker Compose deployment, full CI/CD pipeline",
      "WCAG 2.1 AA accessibility compliant with ARIA live regions and keyboard navigation",
    ],
    stack: ["Python", "Flask", "MySQL", "Bootstrap", "Chart.js", "Docker", "GitHub Actions"],
    github: "https://github.com/gaganjainse/AIM",
    demo: "https://aim-live.vercel.app",
    featured: true,
  },
  {
    name: "Food Waste Reduction System (FWRS)",
    tag: "FULL STACK",
    description: "Optimizes surplus food allocation to NGOs using 3-stage linear programming (fairness → priority → cost).",
    details: [
      "Multi-stage LP optimization with PuLP — 3-stage lexicographic solver",
      "Expiry-aware routing and priority-weighted NGO distribution",
      "Interactive Folium/Leaflet map with animated routes and heatmap",
      "Desktop Tkinter GUI, Flask web dashboard, and CSV export",
    ],
    stack: ["Python", "PuLP", "Flask", "Folium", "NetworkX", "Matplotlib", "Tkinter"],
    github: "https://github.com/gaganjainse/Food_Waste_Reduction_System",
    featured: true,
  },
  {
    name: "GameVault",
    tag: "FULL STACK",
    description: "Social gaming marketplace with Next.js 14, Supabase, tag-based search, and responsive dark-theme UI.",
    details: [
      "Next.js full-stack app with React Server Components and API routes",
      "Advanced game search with tag-based filtering and sorting",
      "Server-verified checkout via Postgres functions, not client-trusted",
      "Responsive design with dark theme and smooth interactions",
    ],
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase"],
    github: "https://github.com/gaganjainse/GameVault",
    featured: true,
  },
  {
    name: "Grievance Portal",
    tag: "PRODUCTION-READY",
    description: "Multi-role Laravel 11 web app for citizens to file grievances and officers/admins to resolve them.",
    details: [
      "Laravel 11 backend with MySQL, Docker Compose, and Nginx reverse proxy",
      "Role-based access: Admin, Staff, and User with granular permissions",
      "File uploads, status tracking, and email notifications",
      "Database migration ordering with proper foreign key constraint management",
    ],
    stack: ["PHP", "Laravel 11", "MySQL", "Docker", "Nginx", "Bootstrap"],
    github: "https://github.com/gaganjainse/grievance-portal",
    featured: true,
  },
  {
    name: "ClinicLedger",
    tag: "MOBILE",
    description: "Offline-first, voice-assisted medical ledger app for clinics. Built with Jetpack Compose & Room.",
    details: [
      "v2.0 Ultra-Performance with 120FPS body, aggressive memoization, and zero-lag LazyColumn lists",
      "Native Architectural Diagnostic Hub with live database metrics, NLU intent confidence logs, and SystemGuardian",
      "Voice-assisted input with Hindi/English support, habit-aware pacing, and persistent personalization",
      "100+ JUnit 6 tests connected to diagnostic dashboard; Room v5.0 with immutable data models",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Room", "Android", "JUnit 6", "Canvas"],
    github: "https://github.com/gaganjainse/ClinicLedger",
    featured: false,
  },
  {
    name: "VillageClinicLedger",
    tag: "MOBILE",
    description: "Android app for managing village clinic records, built with Kotlin and Jetpack Compose. Archived.",
    details: [
      "Patient registration, visit history, and medical record management",
      "Built with Kotlin and Jetpack Compose for modern Android UI",
      "SQLite local storage with offline-first architecture",
    ],
    stack: ["Kotlin", "Jetpack Compose", "SQLite", "Android"],
    github: "https://github.com/gaganjainse/VillageClinicLedger",
    featured: false,
  },
  {
    name: "Auto-desktopenv",
    tag: "DEVOPS",
    description: "Usability-first Hyprland dotfiles with AI integrations, Quickshell widgets, and Material themes.",
    details: [
      "Fork of end-4/dots-hyprland with custom AI widget integrations (Gemini, Ollama)",
      "Quickshell-based status bar and sidebars with live previews",
      "Multiple theme systems: illogical-impulse, m3ww, NovelKnock, Hybrid, Windoes",
      "Transparent installation with every command shown before execution",
    ],
    stack: ["Hyprland", "Quickshell", "Lua", "Bash", "AI Widgets"],
    github: "https://github.com/gaganjainse/Auto-desktopenv",
    featured: false,
  },
];

export const SKILLS: Skill[] = [
  { name: "LLM Integration", level: 85, category: "AI / LLM" },
  { name: "RAG Pipelines", level: 75, category: "AI / LLM" },
  { name: "Agentic AI Frameworks", level: 80, category: "AI / LLM" },
  { name: "Prompt Engineering", level: 85, category: "AI / LLM" },
  { name: "Context Engineering", level: 80, category: "AI / LLM" },
  { name: "Multi-Agent Systems", level: 75, category: "AI / LLM" },
  { name: "Tool-Using Agents", level: 70, category: "AI / LLM" },
  { name: "Fine-tuning (QLoRA/LoRA)", level: 70, category: "AI / LLM" },
  { name: "MCP / Tool Protocols", level: 75, category: "AI / LLM" },
  { name: "LangChain / LlamaIndex", level: 65, category: "AI / LLM" },
  { name: "Vector Databases", level: 70, category: "AI / LLM" },
  { name: "Evaluation & Observability", level: 65, category: "AI / LLM" },
  { name: "AI Governance", level: 70, category: "AI / LLM" },
  { name: "Local LLM Deployment", level: 70, category: "AI / LLM" },
  
  { name: "Python", level: 90, category: "Languages" },
  { name: "TypeScript", level: 80, category: "Languages" },
  { name: "JavaScript", level: 85, category: "Languages" },
  { name: "Rust", level: 70, category: "Languages" },
  { name: "C++", level: 65, category: "Languages" },
  { name: "C", level: 60, category: "Languages" },
  { name: "PHP", level: 75, category: "Languages" },
  { name: "HTML/CSS", level: 90, category: "Languages" },
  
  { name: "React", level: 90, category: "Frontend" },
  { name: "React Native", level: 70, category: "Frontend" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
  { name: "Bootstrap", level: 80, category: "Frontend" },
  { name: "Monaco Editor", level: 75, category: "Frontend" },
  { name: "Next.js", level: 70, category: "Frontend" },
  
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Flask", level: 90, category: "Backend" },
  { name: "Express", level: 75, category: "Backend" },
  { name: "FastAPI", level: 75, category: "Backend" },
  { name: "Axum (Rust)", level: 70, category: "Backend" },
  { name: "REST APIs", level: 85, category: "Backend" },
  { name: "WebSockets", level: 70, category: "Backend" },
  { name: "Laravel", level: 75, category: "Backend" },
  { name: "Supabase", level: 60, category: "Backend" },
  
  { name: "MySQL", level: 85, category: "Databases" },
  { name: "MongoDB", level: 75, category: "Databases" },
  { name: "Redis", level: 60, category: "Databases" },
  { name: "SQLite", level: 75, category: "Databases" },
  
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "GitHub Actions", level: 80, category: "DevOps" },
  { name: "Nginx", level: 70, category: "DevOps" },
  { name: "Gunicorn", level: 70, category: "DevOps" },
  { name: "Prometheus", level: 65, category: "DevOps" },
  { name: "Linux", level: 75, category: "DevOps" },
  
  { name: "YOLO", level: 70, category: "Vision / ML" },
  { name: "OpenCV", level: 65, category: "Vision / ML" },
  { name: "NLP", level: 60, category: "Vision / ML" },
  { name: "Ollama", level: 65, category: "Vision / ML" },
  { name: "Computer Vision", level: 65, category: "Vision / ML" },
  { name: "PuLP (Linear Programming)", level: 55, category: "Vision / ML" },
  { name: "Folium", level: 55, category: "Vision / ML" },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Industry 5.0 Industrial Automation Trainee",
    company: "CodenPlay Robotics",
    location: "VIT Vellore / Online",
    duration: "Aug – Nov 2025",
    description: "Built and debugged PLC automation logic and simulated process workflows.",
    highlights: [
      "Built and debugged PLC automation logic (ladder logic, structured text) in CODESYS",
      "Simulated industrial process workflows in Factory I/O",
      "Implemented flow-based control/integration in Node-RED",
      "Covered HMI design, industrial communication, process monitoring, and the debugging→testing→deployment workflow",
    ],
    tags: ["CODESYS", "Factory I/O", "Node-RED", "PLC", "HMI", "Industrial IoT"],
  },
];

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
