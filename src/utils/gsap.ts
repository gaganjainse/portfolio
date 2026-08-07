import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function scrollProgress() {
  if (typeof window === 'undefined') return { kill: () => {} }

  const progressBar = document.querySelector('.scroll-progress') as HTMLElement | null
  if (!progressBar) return { kill: () => {} }

  const update = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    progressBar.style.width = `${progress}%`
  }

  window.addEventListener('scroll', update, { passive: true })
  update()

  return () => window.removeEventListener('scroll', update)
}

export interface RevealOptions {
  selector: string
  trigger?: string | Element
  start?: string
  once?: boolean
  opacity?: number
  y?: number
  x?: number
  duration?: number
  stagger?: number
  ease?: string
}

export function useScrollReveal(options: RevealOptions) {
  if (typeof window === 'undefined') return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  const {
    selector,
    trigger = options.selector,
    start = 'top 80%',
    once = true,
    opacity = 0,
    y = 30,
    x = 0,
    duration = 0.6,
    stagger = 0,
    ease = 'power3.out',
  } = options

  gsap.fromTo(selector,
    { opacity, y, x },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger,
        start,
        once,
      },
    }
  )
}
