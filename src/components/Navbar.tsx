import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS } from '../data'

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('nav')) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileOpen])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      // Use requestAnimationFrame to ensure mobile menu closes first
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('home') }}
            className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            aria-label="Go to top"
          >
            GJ
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
                role="menuitem"
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-primary-light bg-primary/10'
                    : 'text-text-muted hover:text-text hover:bg-bg-card'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-muted hover:text-text rounded-lg hover:bg-bg-card transition-colors"
            onClick={(e) => { e.stopPropagation(); setMobileOpen(!mobileOpen) }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden pb-4 border-t border-border mt-2 pt-2 overflow-hidden"
              role="menu"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
                  role="menuitem"
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-primary-light bg-primary/10'
                      : 'text-text-muted hover:text-text hover:bg-bg-card'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="sr-only">(current page)</span>
                  )}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
