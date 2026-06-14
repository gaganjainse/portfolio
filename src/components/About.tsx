import { SITE_CONFIG } from '../data'

export default function About() {
  return (
    <section className="py-24 px-4 sm:px-6" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold mb-2">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

        <div className="space-y-4 text-text-muted text-lg leading-relaxed">
          <p>
            I'm a Computer Science student at <span className="text-text font-medium">VIT Vellore</span> (expected graduation {SITE_CONFIG.graduation}, CGPA {SITE_CONFIG.cgpa}) who builds real, working software — from full-stack web apps to my own programming language and developer tooling.
          </p>
          <p>
            My degree ran longer than the standard four years — time I used to build{' '}
            <span className="text-primary-light font-medium">Vyākṛti</span> (a complete programming language with compiler and web IDE),{' '}
            <span className="text-primary-light font-medium">AIM</span> (a production-hardened attendance management system with 101 tests and CI/CD), and several other full-stack applications.
          </p>
          <p>
            I've also completed an Industry 5.0 industrial automation training internship, working with PLCs (CODESYS), process simulation (Factory I/O), and Node-RED.
          </p>
          <p>
            I'm looking for <span className="text-text">Software Engineer</span>, <span className="text-text">Full Stack Developer</span>, or <span className="text-text">AI/LLM Developer</span> roles. Based in {SITE_CONFIG.location} and open to relocation.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            `B.Tech CS, VIT Vellore`,
            `CGPA ${SITE_CONFIG.cgpa}`,
            `${SITE_CONFIG.graduation}`,
            SITE_CONFIG.location,
            'Open to relocation',
          ].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-sm bg-bg-card border border-border text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
