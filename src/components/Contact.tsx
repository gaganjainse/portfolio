import { motion } from 'framer-motion'
import { SITE_CONFIG, SOCIAL_LINKS } from '../data'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Contact() {
  return (
    <section className="py-24 px-4 sm:px-6" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-2">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8 mx-auto" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-muted text-lg mb-8 max-w-2xl mx-auto"
        >
          I'm currently looking for GenAI / LLM / Agentic AI roles. If you're hiring or just want to connect, feel free to reach out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="group relative px-8 py-3.5 rounded-xl font-medium bg-primary text-white hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/25 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {SITE_CONFIG.email}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          {SOCIAL_LINKS.filter(l => l.name !== 'Email').map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="px-8 py-3.5 rounded-xl font-medium border border-border text-text hover:border-primary/50 hover:text-primary-light transition-all backdrop-blur-sm"
              aria-label={`${link.name} profile (opens in new tab)`}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-text-muted text-sm"
        >
          {SITE_CONFIG.location} · Open to relocation
        </motion.p>
      </div>
    </section>
  )
}
