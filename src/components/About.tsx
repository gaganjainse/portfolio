import { motion } from 'framer-motion'
import { SITE_CONFIG } from '../data'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function About() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-bg-elevated/50" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold mb-2">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-4 text-text-muted text-lg leading-relaxed"
        >
          <motion.p custom={0} variants={itemVariants}>
            I'm a Computer Science student at <span className="text-text font-medium">VIT Vellore</span> (expected graduation {SITE_CONFIG.graduation}, CGPA {SITE_CONFIG.cgpa}) focused on <span className="text-text font-medium">GenAI, LLMs, and agentic AI systems</span> — from RAG pipelines and fine-tuned models to multi-agent orchestration and production AI platforms.
          </motion.p>

          <motion.p custom={1} variants={itemVariants}>
            My key AI projects include <span className="text-primary-light font-medium">NexusAOS</span> (a governance-first agentic OS with multi-agent swarm orchestration, LLM fine-tuning with QLoRA, and 30+ MCP tools),{' '}
            <span className="text-primary-light font-medium">nexus-kernel</span> (a production-ready Rust AI microkernel with 981 tests, event-sourced governance, and OpenAI/Anthropic streaming), and{' '}
            <span className="text-primary-light font-medium">SeshaOS</span> (a local-first AI OS with specialist models: Gemma 4 12B, Qwen3-Coder 30B, Qwen3.5 9B).{' '}
            I've also built <span className="text-primary-light font-medium">Vyākṛti</span> (a complete programming language with compiler and web IDE),{' '}
            <span className="text-primary-light font-medium">AIM</span> (a production-hardened attendance system with 101 tests and CI/CD), and{' '}
            <span className="text-primary-light font-medium">FWRS</span> (a food waste optimization platform using linear programming).
          </motion.p>

          <motion.p custom={2} variants={itemVariants}>
            I've also completed an Industry 5.0 industrial automation training internship, working with PLCs (CODESYS), process simulation (Factory I/O), and Node-RED.
          </motion.p>

          <motion.p custom={3} variants={itemVariants}>
            I'm looking for <span className="text-text">GenAI / LLM Engineer</span>, <span className="text-text">Agentic AI Engineer</span>, or <span className="text-text">AI Engineer</span> roles. Based in {SITE_CONFIG.location} and open to relocation.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {[
            `B.Tech CSE, VIT Vellore`,
            `CGPA ${SITE_CONFIG.cgpa}`,
            `${SITE_CONFIG.graduation}`,
            SITE_CONFIG.location,
            'Open to relocation',
          ].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-sm bg-bg-card border border-border text-text-muted hover:border-primary/30 hover:text-text transition-all">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
