import { ExternalLink } from 'lucide-react'

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

interface Project {
  name: string
  tag: string
  description: string
  details?: string[]
  stack: string[]
  github: string
  demo?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    name: 'Vyākṛti',
    tag: 'FLAGSHIP',
    description: 'A Sanskrit-oriented programming language with a complete compiler pipeline and browser-based IDE.',
    details: [
      'Complete compiler pipeline: lexer → parser → type checker → bytecode compiler → stack-based VM',
      'Web IDE built with React + Monaco Editor with syntax highlighting, autocomplete, and diagnostics',
      'Rust (axum) backend with compile, REPL, LSP, and file management endpoints',
      '123 tests covering the full pipeline; self-hosting corpus with language parsing its own source',
    ],
    stack: ['Rust', 'React', 'TypeScript', 'Monaco Editor', 'Zustand', 'Tailwind CSS', 'Axum'],
    github: 'https://github.com/gaganjainse/Vyakrti',
    featured: true,
  },
  {
    name: 'AIM',
    tag: 'PRODUCTION-READY',
    description: 'Full-stack attendance management system with production-grade security and DevOps.',
    details: [
      'Argon2id auth, CSRF protection, brute-force lockout, breached-password detection',
      'Reporting with Chart.js, FullCalendar, light/dark themes, CSV import/export',
      'Prometheus monitoring, 84 tests, Docker Compose deployment, full CI/CD pipeline',
      'WCAG 2.1 AA accessibility compliant',
    ],
    stack: ['Python', 'Flask', 'MySQL', 'Bootstrap', 'Chart.js', 'Docker', 'GitHub Actions'],
    github: 'https://github.com/gaganjainse/AIM',
    featured: true,
  },
  {
    name: 'Food Delivery App',
    tag: 'MOBILE',
    description: 'Cross-platform mobile app with authentication, restaurant browsing, ordering, and tracking.',
    stack: ['React Native', 'Node.js', 'MongoDB Atlas'],
    github: 'https://github.com/gaganjainse',
  },
  {
    name: 'Sentiment Analysis',
    tag: 'AI/ML',
    description: 'Facial-recognition-based emotion/sentiment detection using YOLO and computer vision.',
    stack: ['Python', 'YOLO', 'OpenCV', 'Machine Learning'],
    github: 'https://github.com/gaganjainse',
  },
  {
    name: 'IoT House Security',
    tag: 'IoT',
    description: 'Raspberry Pi security node with sensors and cameras for real-time monitoring and alerts.',
    stack: ['Raspberry Pi', 'Python', 'Sensors', 'Camera'],
    github: 'https://github.com/gaganjainse',
  },
  {
    name: 'RFID Access Control',
    tag: 'IoT + ML',
    description: 'Embedded access-control prototype with Python ML for behavioral analysis.',
    stack: ['Arduino', 'RFID', 'Python', 'Machine Learning'],
    github: 'https://github.com/gaganjainse',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="text-primary-light">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-12" />

        <div className="space-y-8">
          {projects.map(project => (
            <div
              key={project.name}
              className={`rounded-xl border p-6 sm:p-8 transition-all hover:border-primary/30 ${
                project.featured
                  ? 'bg-bg-card border-primary/20'
                  : 'bg-bg-card/50 border-border'
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  project.tag === 'FLAGSHIP'
                    ? 'bg-primary/20 text-primary-light'
                    : project.tag === 'PRODUCTION-READY'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-bg-card text-text-muted border border-border'
                }`}>
                  {project.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-text">{project.name}</h3>
              </div>

              <p className="text-text-muted mb-4">{project.description}</p>

              {project.details && (
                <ul className="space-y-2 mb-4">
                  {project.details.map((detail, i) => (
                    <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0">▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map(tech => (
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
                >
                  <GithubIcon />
                  Source Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-muted hover:text-primary-light transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
