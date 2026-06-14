import { motion } from 'framer-motion'
import { SITE_CONFIG, SOCIAL_LINKS } from '../data'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" aria-label="Hero">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Photo */}
          <motion.div variants={item} className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-2 border-primary/30 overflow-hidden bg-bg-card">
                <img
                  src="/profile.jpg"
                  alt="Gagan Jain — Software Engineer"
                  className="w-full h-full object-cover"
                  loading="eager"
                  width={112}
                  height={112}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full border-4 border-bg flex items-center justify-center" title="Available for roles">
                <span className="text-[10px] font-bold text-white">✓</span>
              </div>
            </div>
          </motion.div>

          {/* Availability badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-success/10 text-success border border-success/20">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
              {SITE_CONFIG.availability}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Hi, I'm{' '}
            <span className="gradient-text">{SITE_CONFIG.name}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p variants={item} className="text-xl sm:text-2xl text-text-muted mb-4 max-w-2xl mx-auto">
            {SITE_CONFIG.tagline}
          </motion.p>

          {/* Subtitle */}
          <motion.p variants={item} className="text-base text-text-muted/70 mb-8 max-w-xl mx-auto">
            CS @ VIT Vellore · Building Vyākṛti — a programming language with a web IDE
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-6 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href="https://github.com/gaganjainse"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium border border-border text-text hover:border-primary/50 hover:text-primary-light transition-all hover:-translate-y-0.5"
              aria-label="GitHub profile (opens in new tab)"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/gaganjainse"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium border border-border text-text hover:border-primary/50 hover:text-primary-light transition-all hover:-translate-y-0.5"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="px-6 py-3 rounded-lg font-medium border border-accent/30 text-accent hover:bg-accent/10 transition-all hover:-translate-y-0.5"
              aria-label={`Email ${SITE_CONFIG.email}`}
            >
              Contact
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="p-2 text-text-muted hover:text-primary-light transition-colors rounded-lg hover:bg-bg-card"
                aria-label={link.name}
              >
                {link.icon === 'github' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                {link.icon === 'linkedin' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {link.icon === 'email' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          aria-hidden="true"
        >
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
