export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          About <span className="text-primary-light">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

        <div className="space-y-4 text-text-muted text-lg leading-relaxed">
          <p>
            I'm a Computer Science student at <span className="text-text font-medium">VIT Vellore</span> (expected graduation July 2026, CGPA 7.5+) who builds real, working software — from full-stack web apps to my own programming language and developer tooling.
          </p>
          <p>
            I had academic backlogs that extended my degree timeline, but I used the extra time productively — building <span className="text-primary-light font-medium">Vyākṛti</span> (a complete programming language with compiler and web IDE), <span className="text-primary-light font-medium">AIM</span> (a production-hardened attendance management system), and several other full-stack applications.
          </p>
          <p>
            I've also completed an Industry 5.0 industrial automation training internship working with PLCs, process simulation, and IoT systems. I'm looking for entry-level roles as a <span className="text-text">Software Engineer</span>, <span className="text-text">Full Stack Developer</span>, or <span className="text-text">AI/LLM Developer</span>. Based in Vellore, India and open to relocation.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {['B.Tech CS, VIT Vellore', 'CGPA 7.5+', 'Expected July 2026', 'Vellore, India', 'Open to relocation'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-sm bg-bg-card border border-border text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
