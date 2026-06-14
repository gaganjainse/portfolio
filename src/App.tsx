import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { NAV_ITEMS } from './data'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxRatio = 0
        let currentSection = activeSection

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            currentSection = entry.target.id
          }
        })

        if (maxRatio > 0) {
          setActiveSection(currentSection)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    )

    observerRef.current = observer

    NAV_ITEMS.forEach(({ id }: { id: string }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-pulse-glow">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <a href="#mainContent" className="skip-link">Skip to content</a>
      <Navbar activeSection={activeSection} />
      <main id="mainContent">
        <Hero />
        <AnimatePresence>
          <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <About />
          </motion.section>
          <motion.section id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Skills />
          </motion.section>
          <motion.section id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Projects />
          </motion.section>
          <motion.section id="experience" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Experience />
          </motion.section>
          <motion.section id="contact" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Contact />
          </motion.section>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
