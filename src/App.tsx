import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Check each section in reverse order (bottom to top)
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const { id } = NAV_ITEMS[i]
        const element = document.getElementById(id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
            return
          }
        }
      }

      // If we're at the very top, set to home
      if (window.scrollY < 100) {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
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
      <Analytics />
    </div>
  )
}

export default App
