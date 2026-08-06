# Portfolio — Gagan Jain

![Astro](https://img.shields.io/badge/Astro-7.2.0-FF5D01?logo=astro)
![Tailwind](https://img.shields.io/badge/Tailwind-v4.3-06B6D4?logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?logo=greensock)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)

Personal portfolio website of **Gagan Jain** — AI / LLM Engineer. Built with [Astro 7](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and [GSAP](https://gsap.com). Focused on production-grade GenAI systems: multi-agent orchestration, LLM fine-tuning, RAG pipelines, and agentic AI platforms.

## 🚀 Quick Start

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| **Framework** | Astro 7.2.0 |
| **Content** | MDX + Markdown |
| **Styling** | Tailwind CSS v4.3 |
| **Animations** | GSAP + ScrollTrigger |
| **Integrations** | `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/vercel`, `@astrojs/partytown` |
| **Deployment** | Vercel with ISR caching |

## 📁 Project Structure

```
src/
├── components/sections/  # Page sections (Hero, About, Skills, Projects, Contact)
├── layouts/              # BaseLayout, DocsLayout
├── pages/                # File-based routing (/, /resume, /docs)
├── styles/               # Global CSS + Tailwind v4 theme tokens
├── data/                 # Static data (skills)
├── utils/                # GSAP helpers, site config
└── content/              # Content collections
public/                   # Static assets (favicon, resume PDF, robots.txt)
```

## 📄 Resume

Resume is available at [`/resume`](https://gaganjain.vercel.app/resume) and as a PDF at [`/resume.pdf`](https://gaganjain.vercel.app/resume.pdf).

## 🌐 Live Site

[https://gaganjain.vercel.app](https://gaganjain.vercel.app)

## 📄 License

MIT
