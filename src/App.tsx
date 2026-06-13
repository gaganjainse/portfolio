import { useScrollSpy } from '@/hooks/useScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'contact']

function App() {
  const activeSection = useScrollSpy(SECTION_IDS)

  return (
    <div className="min-h-screen bg-bg">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
