import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-border" role="contentinfo">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-text-muted text-sm mb-3"
        >
          © {new Date().getFullYear()} Gagan Jain · Built with React + Vite + Tailwind CSS
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 text-sm"
        >
          <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
            Resume
          </a>
          <span className="text-border">·</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-text-muted hover:text-text transition-colors">
            Back to top
          </button>
        </motion.div>
      </div>
    </footer>
  )
}
