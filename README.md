# Portfolio — Gagan Jain

![Astro](https://img.shields.io/badge/Astro-7.2.0-FF5D01?logo=astro)
![Tailwind](https://img.shields.io/badge/Tailwind-v4.3-06B6D4?logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)

Personal portfolio website of **Gagan Jain** — AI / LLM Engineer. Built with [Astro 7](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and [GSAP](https://gsap.com). Focused on production-grade GenAI systems: multi-agent orchestration, LLM fine-tuning, RAG pipelines, agentic AI platforms, and AI governance.

## About

CS @ VIT Vellore (Graduated 2025, CGPA 7.7/10). I build practical AI systems: LLM-powered apps, RAG pipelines, autonomous agents, and production-ready GenAI platforms. Strong Python foundation with end-to-end deployment experience.

### AI/LLM Projects

- **NexusAOS** — Governance-first agentic OS with multi-agent swarm orchestration, QLoRA fine-tuning, and 30+ MCP tools
- **nexus-kernel** — Production-ready Rust AI microkernel with event-sourced governance, OpenAI/Anthropic streaming, and 981 tests
- **SeshaOS** — Local-first AI OS with specialist models (Gemma 4, Qwen3) and LiteLLM-compatible routing

### Other Projects

- **Vyākṛti** — Sanskrit-oriented programming language with complete compiler pipeline and browser IDE
- **AIM** — Production-grade attendance system with Argon2id auth, Prometheus monitoring, and 101 tests
- **FWRS** — Food waste optimization platform using linear programming

Looking for **GenAI / LLM Engineer**, **Agentic AI Engineer**, or **AI Engineer** roles. Based in Jaipur, Rajasthan, India and open to relocation.

## 🚀 Quick Start

Requires **Node.js >= 22.12.0** (Astro 7 requirement).

```bash
npm install
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Unit tests (vitest)
npm run check        # Type-check (astro check)
npm run lint         # ESLint
npm run format       # Prettier (write)
npm run format:check # Prettier (verify)
```

## 🛠️ Tech Stack

| Layer            | Tools                                                 |
| ---------------- | ----------------------------------------------------- |
| **Framework**    | Astro 7.2.0 (static output)                           |
| **Content**      | MDX                                                   |
| **Styling**      | Tailwind CSS v4.3                                     |
| **Animations**   | GSAP + ScrollTrigger                                  |
| **Integrations** | `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/vercel` |
| **Deployment**   | Vercel (static, with 301 redirects via `vercel.json`) |

## 📁 Project Structure

```
src/
├── components/
│   └── sections/        # Page sections (Hero, About, Skills, Projects, Contact)
├── layouts/              # BaseLayout
├── pages/                # File-based routing (/, /resume, /404, /docs)
├── styles/               # Global CSS + Tailwind v4 theme tokens
├── data/                 # Single-source data (config, projects, skills, experience)
└── utils/                # GSAP helpers, reduced-motion util
public/                   # Static assets (favicon, icons, resume.pdf, robots.txt)
scripts/                  # PDF generation (puppeteer)
.github/workflows/        # CI (build + test + type-check + lint)
```

## 📄 Résumé

Résumé is available at [`/resume`](https://gaganjain.vercel.app/resume) and as a PDF at [`/resume.pdf`](https://gaganjain.vercel.app/resume.pdf). The old `/résumé` URLs redirect with a 301.

The web résumé is generated from the same data files as the site (`src/data/skills.ts`, `src/data/experience.ts`, `src/data/projects.ts`), so it can't drift. To regenerate the PDF from the built site:

```bash
npm run build
npm run resume:pdf     # prints dist/resume/index.html to public/resume.pdf
```

## 🧪 Tests

```bash
npm test
```

Vitest unit tests cover the data layer (`src/data/*.test.ts`): skill categorization, proficiency labels, project integrity, and test-count attribution.

## 🌐 Live Site

[https://gaganjain.vercel.app](https://gaganjain.vercel.app)

## 📄 License

MIT
