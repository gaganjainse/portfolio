import { useEffect, useState } from 'react'

/**
 * Custom hook to track scroll position and determine active section
 */
export function useScrollSpy(sectionIds: string[], offset: number = 150) {
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sectionIds) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= offset && rect.bottom > offset) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}

/**
 * Custom hook to detect if user has scrolled past a threshold
 */
export function useScrolled(threshold: number = 50) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

/**
 * Custom hook for smooth scrolling to elements
 */
export function useSmoothScroll() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return scrollTo
}
