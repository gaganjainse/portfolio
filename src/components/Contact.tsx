import { SITE_CONFIG, SOCIAL_LINKS } from '../data'

export default function Contact() {
  return (
    <section className="py-24 px-4 sm:px-6" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-2">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8 mx-auto" />

        <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">
          I'm currently looking for software engineering roles. If you're hiring or just want to connect, feel free to reach out.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/25"
            aria-label={`Email ${SITE_CONFIG.email}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {SITE_CONFIG.email}
          </a>
          {SOCIAL_LINKS.filter(l => l.name !== 'Email').map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-border text-text hover:border-primary/50 hover:text-primary-light transition-all"
              aria-label={`${link.name} profile (opens in new tab)`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <p className="text-text-muted text-sm">
          {SITE_CONFIG.location} · Open to relocation
        </p>
      </div>
    </section>
  )
}
