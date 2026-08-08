import { describe, it, expect } from 'vitest'
import { EXPERIENCE } from './experience.ts'

describe('EXPERIENCE data', () => {
  it('has at least one entry', () => {
    expect(EXPERIENCE.length).toBeGreaterThan(0)
  })

  it('every entry has title, company, period, bullets and tags', () => {
    for (const job of EXPERIENCE) {
      expect(job.title.length).toBeGreaterThan(0)
      expect(job.company.length).toBeGreaterThan(0)
      expect(job.period.length).toBeGreaterThan(0)
      expect(job.bullets.length).toBeGreaterThan(0)
      expect(job.tags.length).toBeGreaterThan(0)
    }
  })

  it('every bullet is a non-empty string', () => {
    for (const job of EXPERIENCE) {
      for (const bullet of job.bullets) {
        expect(bullet.trim().length).toBeGreaterThan(0)
      }
    }
  })
})
