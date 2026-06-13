export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-bg to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary-light border border-primary/20">
            Open to entry-level SWE roles
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">
            Gagan Jain
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-text-muted mb-4 max-w-2xl mx-auto">
          Software Engineer building full-stack apps, developer tooling, and AI/LLM projects
        </p>

        <p className="text-base sm:text-lg text-text-muted/80 mb-8 max-w-2xl mx-auto">
          Including <span className="text-primary-light font-medium">Vyākṛti</span> — my own programming language and web IDE built from scratch
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            View Projects
          </a>
          <a
            href="https://github.com/gaganjainse"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-medium border border-border text-text hover:border-primary/50 hover:text-primary-light transition-all"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/gagan-jain-a88aab345"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-medium border border-border text-text hover:border-primary/50 hover:text-primary-light transition-all"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-medium border border-accent/30 text-accent hover:bg-accent/10 transition-all"
          >
            Download Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-text-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
