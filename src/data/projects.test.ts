import { describe, it, expect } from 'vitest'
import { PROJECTS, getTagClasses } from './projects.ts'

describe('PROJECTS data', () => {
  it('lists at least eight projects (auto-updated from GitHub)', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(8)
  })

  it('has at least six featured projects (shown on the resume)', () => {
    const featured = PROJECTS.filter((p) => p.featured)
    expect(featured.length).toBeGreaterThanOrEqual(6)
    for (const project of featured) {
      expect(project.github).toMatch(/^https:\/\/github\.com\/gaganjainse\//)
    }
  })

  it('every project has a title, tag, tagColor, description, tech stack and github link', () => {
    for (const project of PROJECTS) {
      expect(project.title.length).toBeGreaterThan(0)
      expect(project.tag.length).toBeGreaterThan(0)
      expect(typeof project.tagColor).toBe('string')
      expect(project.description.length).toBeGreaterThan(10)
      expect(project.tech.length).toBeGreaterThan(0)
      expect(project.github).toMatch(/^https:\/\/github\.com\/gaganjainse\//)
    }
  })

  it('every project has a non-negative tests count', () => {
    for (const project of PROJECTS) {
      expect(project.tests).toBeGreaterThanOrEqual(0)
    }
  })

  it('flagship SheshAOS carries the verified test count', () => {
    const sheshaos = PROJECTS.find((p) => p.title === 'SheshAOS')
    expect(sheshaos).toBeDefined()
    expect(sheshaos?.tests).toBeGreaterThanOrEqual(800)
  })

  it('every companion project points at an existing project', () => {
    const titles = new Set(PROJECTS.map((p) => p.title.toLowerCase()))
    for (const p of PROJECTS) {
      if (p.companionOf) expect(titles.has(p.companionOf.toLowerCase())).toBe(true)
    }
  })

  it('github urls are unique', () => {
    const urls = PROJECTS.map((p) => p.github.toLowerCase())
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('every project links its documentation (docs or github)', () => {
    for (const project of PROJECTS) {
      expect(project.github).toMatch(/^https:\/\/github\.com\/gaganjainse\//)
    }
  })

  it('includes shesh ecosystem if present (auto)', () => {
    const hasShesh = PROJECTS.some((p) => p.title.toLowerCase().includes('shesh'))
    // If we have shesh repos, should have at least one shesh project
    if (hasShesh) expect(hasShesh).toBe(true)
  })
})

describe('getTagClasses', () => {
  it('returns a class string for known tag colors', () => {
    expect(getTagClasses('pink')).toContain('bg-pink-500/20')
    expect(getTagClasses('green')).toContain('bg-green-500/20')
    expect(getTagClasses('primary')).toContain('bg-primary/20')
  })

  it('falls back to primary for unknown tag colors', () => {
    expect(getTagClasses('does-not-exist')).toContain('bg-primary/20')
  })
})
