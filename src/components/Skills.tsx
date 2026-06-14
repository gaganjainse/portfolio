import { SKILLS } from '../data'

const CATEGORY_BAR_COLORS: Record<string, string> = {
  Languages: 'bg-blue-500',
  Frontend: 'bg-green-500',
  Backend: 'bg-purple-500',
  Databases: 'bg-amber-500',
  DevOps: 'bg-cyan-500',
  'AI/ML': 'bg-pink-500',
}

function getProficiencyLabel(level: number): string {
  if (level >= 85) return 'Fluent'
  if (level >= 70) return 'Experienced'
  if (level >= 55) return 'Familiar'
  return 'Learning'
}

export default function Skills() {
  const categories = [...new Set(SKILLS.map((s) => s.category))]

  return (
    <section className="py-24 px-4 sm:px-6 bg-bg-card/30" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold mb-2">
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category} className="bg-bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${CATEGORY_BAR_COLORS[category]?.replace('bg-', 'bg-') || 'bg-primary'}`} aria-hidden="true" />
                {category}
              </h3>
              <div className="space-y-3">
                {SKILLS.filter((s) => s.category === category).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text">{skill.name}</span>
                      <span className="text-xs text-text-muted">{getProficiencyLabel(skill.level)}</span>
                    </div>
                    <div className="h-1.5 bg-bg rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name}: ${getProficiencyLabel(skill.level)}`}>
                      <div
                        className={`h-full rounded-full skill-bar-fill ${CATEGORY_BAR_COLORS[category] || 'bg-primary'}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
