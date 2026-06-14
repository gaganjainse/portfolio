import { EXPERIENCES } from '../data'

export default function Experience() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-bg-card/30" aria-labelledby="experience-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="gradient-text">Experience</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-12" />

        {EXPERIENCES.map((exp) => (
          <article key={exp.title} className="bg-bg-card border border-border rounded-xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-text">{exp.title}</h3>
                <p className="text-primary-light font-medium">{exp.company}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-bg border border-border text-text-muted shrink-0">
                {exp.duration}
              </span>
            </div>

            <p className="text-text-muted text-sm mb-4">{exp.location} · {exp.description}</p>

            <ul className="space-y-3 mb-6">
              {exp.highlights.map((item, i) => (
                <li key={i} className="text-text-muted flex items-start gap-3">
                  <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-bg text-text-muted border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
