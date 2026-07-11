import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data'

const FILTERS = ['All', 'FLAGSHIP', 'PRODUCTION-READY', 'FULL STACK', 'MOBILE', 'AI/ML', 'IoT']

const TAG_COLORS: Record<string, string> = {
  FLAGSHIP: 'bg-primary/20 text-primary-light',
  'PRODUCTION-READY': 'bg-green-500/20 text-green-400',
  'FULL STACK': 'bg-indigo-500/20 text-indigo-400',
  MOBILE: 'bg-blue-500/20 text-blue-400',
  'AI/ML': 'bg-pink-500/20 text-pink-400',
  IoT: 'bg-amber-500/20 text-amber-400',
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.tag === activeFilter)

  return (
    <section className="py-24 px-4 sm:px-6" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="gradient-text">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-bg-card border border-border text-text-muted hover:text-text hover:border-primary/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filtered.map((project) => (
              <article
                key={project.name}
                className="project-card bg-bg-card border border-border rounded-xl p-6 sm:p-8 hover:border-primary/30 transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${TAG_COLORS[project.tag] || 'bg-bg-card text-text-muted border border-border'}`}>
                    {project.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-text">{project.name}</h3>
                </div>

                <p className="text-text-muted mb-4">{project.description}</p>

                {project.details && (
                  <ul className="space-y-2 mb-4">
                    {project.details.map((detail, i) => (
                      <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                        <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">▸</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-bg text-text-muted border border-border">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-muted hover:text-primary-light transition-colors"
                    aria-label={`${project.name} source code on GitHub (opens in new tab)`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Source Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                      aria-label={`${project.name} live demo (opens in new tab)`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
