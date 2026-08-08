import { describe, it, expect } from 'vitest'
import { getProficiencyLabel, groupByCategory, SKILLS } from './skills.ts'

describe('getProficiencyLabel', () => {
  it('returns Fluent for levels >= 85', () => {
    expect(getProficiencyLabel(85)).toBe('Fluent')
    expect(getProficiencyLabel(90)).toBe('Fluent')
  })

  it('returns Experienced for levels 70-84', () => {
    expect(getProficiencyLabel(70)).toBe('Experienced')
    expect(getProficiencyLabel(84)).toBe('Experienced')
  })

  it('returns Familiar for levels 55-69', () => {
    expect(getProficiencyLabel(55)).toBe('Familiar')
    expect(getProficiencyLabel(69)).toBe('Familiar')
  })

  it('returns Learning for levels < 55', () => {
    expect(getProficiencyLabel(54)).toBe('Learning')
    expect(getProficiencyLabel(0)).toBe('Learning')
  })
})

describe('groupByCategory', () => {
  it('groups every skill under its category with a name and color', () => {
    const grouped = groupByCategory(SKILLS)
    const categoryNames = Object.keys(grouped)
    expect(categoryNames).toContain('AI / LLM')
    expect(categoryNames).toContain('LLM Ops')
    expect(categoryNames).toContain('Languages')
    expect(categoryNames).toContain('Frontend')

    for (const category of categoryNames) {
      expect(grouped[category].name).toBe(category)
      expect(typeof grouped[category].color).toBe('string')
      expect(grouped[category].skills.length).toBeGreaterThan(0)
    }
  })

  it('keeps the AI / LLM and LLM Ops categories balanced (no giant box)', () => {
    const grouped = groupByCategory(SKILLS)
    const ai = grouped['AI / LLM']?.skills.length ?? 0
    const ops = grouped['LLM Ops']?.skills.length ?? 0
    expect(ai).toBeLessThanOrEqual(12)
    expect(ops).toBeLessThanOrEqual(10)
  })

  it('contains the same total number of skills as the source data', () => {
    const grouped = groupByCategory(SKILLS)
    const total = Object.values(grouped).reduce((sum, g) => sum + g.skills.length, 0)
    expect(total).toBe(SKILLS.length)
  })

  it('puts every skill in exactly one category', () => {
    const grouped = groupByCategory(SKILLS)
    const seen = new Set<string>()
    for (const group of Object.values(grouped)) {
      for (const skill of group.skills) {
        expect(seen.has(skill.name)).toBe(false)
        seen.add(skill.name)
      }
    }
    expect(seen.size).toBe(SKILLS.length)
  })
})
