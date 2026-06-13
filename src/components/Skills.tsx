const skillGroups = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Rust', 'C', 'C++', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'React Native', 'Tailwind CSS', 'Bootstrap', 'Jinja2'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Flask', 'Axum (Rust)', 'REST APIs'],
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'MongoDB Atlas'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Linux', 'Monaco Editor'],
  },
  {
    title: 'AI/ML & Other',
    skills: ['YOLO', 'Computer Vision', 'NLP', 'Ollama', 'IoT', 'Raspberry Pi', 'Arduino'],
  },
]

const colorClasses = [
  'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'bg-green-500/10 text-green-400 border-green-500/20',
  'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'bg-pink-500/10 text-pink-400 border-pink-500/20',
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 bg-bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Technical <span className="text-primary-light">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <div key={group.title} className="bg-bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
              <h3 className="text-lg font-semibold text-text mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[i % colorClasses.length]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
