# Portfolio — Gagan Jain

Personal portfolio website built with Astro 7, GSAP, Tailwind CSS v4, and MDX.

## 🚀 Quick Start

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## 🛠️ Tech Stack

- **Framework:** Astro 7.2.0
- **Content:** MDX + Markdown
- **Styling:** Tailwind CSS v4.3
- **Animations:** GSAP + ScrollTrigger
- **Ecosystem:**
  - `@astrojs/mdx` — MDX support
  - `@astrojs/sitemap` — auto-generated sitemap
  - `@astrojs/vercel` — Vercel adapter with ISR caching
  - `@astrojs/partytown` — offload third-party scripts
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── components/sections/  # Astro components (Hero, About, Skills, Projects, etc.)
├── layouts/              # BaseLayout, DocsLayout
├── pages/                # File-based routing (index, resume, docs)
├── styles/               # Global CSS with Tailwind v4 theme tokens
├── data/                 # Skills data
├── utils/                # GSAP utilities, site config
└── content/              # Content collections (if any)
public/                   # Static assets (favicon, resume PDF, robots.txt)
```

## 📄 Resume

Resume is available at `/resume` and as a PDF at `/resume.pdf`.

## 🌐 Live Site

[https://gaganjain.vercel.app](https://gaganjain.vercel.app)

## 📄 License

MIT
