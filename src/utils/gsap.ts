import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './dom.ts'

gsap.registerPlugin(ScrollTrigger)

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

  if (prefersReducedMotion()) return

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

  gsap.fromTo(
    selector,
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
    },
  )
}
