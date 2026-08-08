import { describe, it, expect } from 'vitest'
import { PROJECTS, getTagClasses } from './projects.ts'

describe('PROJECTS data', () => {
  it('lists eight projects', () => {
    expect(PROJECTS.length).toBe(8)
  })

  it('has exactly six featured projects (shown on the resume)', () => {
    const featured = PROJECTS.filter((p) => p.featured)
    expect(featured.length).toBe(6)
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

  it('attribution: the 981 tests belong to nexus-kernel, not NexusAOS', () => {
    const kernel = PROJECTS.find((p) => p.title === 'nexus-kernel')
    const nexusAOS = PROJECTS.find((p) => p.title === 'NexusAOS')
    expect(kernel?.tests).toBe(981)
    expect(nexusAOS?.tests).toBe(0)
  })

  it('github urls are unique', () => {
    const urls = PROJECTS.map((p) => p.github)
    expect(new Set(urls).size).toBe(urls.length)
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
