export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollProgress() {
  if (typeof window === 'undefined') return { kill: () => {} }

  const progressBar = document.querySelector<HTMLElement>('.scroll-progress')
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
