export interface Skill {
  name: string
  level: number
  category: string
}

export interface SkillCategory {
  name: string
  color: string
  skills: Skill[]
}

export const CATEGORY_COLORS: Record<string, string> = {
  'AI / LLM': '#ec4899',
  'Vision / ML': '#f97316',
  Languages: '#3b82f6',
  Frontend: '#22c55e',
  Backend: '#a855f7',
  Databases: '#f59e0b',
  DevOps: '#06b6d4',
}

export const SKILLS = [
  { name: 'LLM Integration', level: 85, category: 'AI / LLM' },
  { name: 'RAG Pipelines', level: 75, category: 'AI / LLM' },
  { name: 'Agentic AI Frameworks', level: 80, category: 'AI / LLM' },
  { name: 'Prompt Engineering', level: 85, category: 'AI / LLM' },
  { name: 'Context Engineering', level: 80, category: 'AI / LLM' },
  { name: 'Multi-Agent Systems', level: 75, category: 'AI / LLM' },
  { name: 'Tool-Using Agents', level: 70, category: 'AI / LLM' },
  { name: 'Fine-tuning (QLoRA/LoRA)', level: 70, category: 'AI / LLM' },
  { name: 'MCP / Tool Protocols', level: 75, category: 'AI / LLM' },
  { name: 'LangChain / LlamaIndex', level: 65, category: 'AI / LLM' },
  { name: 'Vector Databases', level: 70, category: 'AI / LLM' },
  { name: 'Evaluation & Observability', level: 65, category: 'AI / LLM' },
  { name: 'AI Governance', level: 70, category: 'AI / LLM' },
  { name: 'Local LLM Deployment', level: 70, category: 'AI / LLM' },
  { name: 'OpenAI / Anthropic APIs', level: 78, category: 'AI / LLM' },
  { name: 'Embeddings', level: 72, category: 'AI / LLM' },
  { name: 'Structured Outputs / Function Calling', level: 72, category: 'AI / LLM' },
  { name: 'LiteLLM / Model Routing', level: 70, category: 'AI / LLM' },
  { name: 'Streaming Responses', level: 72, category: 'AI / LLM' },
  { name: 'NLP', level: 60, category: 'AI / LLM' },
  { name: 'Ollama', level: 65, category: 'AI / LLM' },
  { name: 'Python', level: 90, category: 'Languages' },
  { name: 'TypeScript', level: 80, category: 'Languages' },
  { name: 'JavaScript', level: 85, category: 'Languages' },
  { name: 'Rust', level: 70, category: 'Languages' },
  { name: 'C++', level: 65, category: 'Languages' },
  { name: 'C', level: 60, category: 'Languages' },
  { name: 'PHP', level: 75, category: 'Languages' },
  { name: 'HTML/CSS', level: 90, category: 'Languages' },
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'React Native', level: 70, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
  { name: 'Bootstrap', level: 80, category: 'Frontend' },
  { name: 'Monaco Editor', level: 75, category: 'Frontend' },
  { name: 'Next.js', level: 70, category: 'Frontend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Flask', level: 90, category: 'Backend' },
  { name: 'Express', level: 75, category: 'Backend' },
  { name: 'FastAPI', level: 75, category: 'Backend' },
  { name: 'Axum (Rust)', level: 70, category: 'Backend' },
  { name: 'REST APIs', level: 85, category: 'Backend' },
  { name: 'WebSockets', level: 70, category: 'Backend' },
  { name: 'Laravel', level: 75, category: 'Backend' },
  { name: 'Supabase', level: 60, category: 'Backend' },
  { name: 'MySQL', level: 85, category: 'Databases' },
  { name: 'MongoDB', level: 75, category: 'Databases' },
  { name: 'Redis', level: 60, category: 'Databases' },
  { name: 'SQLite', level: 75, category: 'Databases' },
  { name: 'Docker', level: 80, category: 'DevOps' },
  { name: 'GitHub Actions', level: 80, category: 'DevOps' },
  { name: 'Nginx', level: 70, category: 'DevOps' },
  { name: 'Gunicorn', level: 70, category: 'DevOps' },
  { name: 'Prometheus', level: 65, category: 'DevOps' },
  { name: 'Linux', level: 75, category: 'DevOps' },
  { name: 'YOLO', level: 70, category: 'Vision / ML' },
  { name: 'OpenCV', level: 65, category: 'Vision / ML' },
  { name: 'Computer Vision', level: 65, category: 'Vision / ML' },
]

export function getProficiencyLabel(level: number): string {
  if (level >= 85) return 'Fluent'
  if (level >= 70) return 'Experienced'
  if (level >= 55) return 'Familiar'
  return 'Learning'
}

export function groupByCategory(skills: Skill[]): Record<string, SkillCategory> {
  return skills.reduce<Record<string, SkillCategory>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = {
        name: skill.category,
        color: CATEGORY_COLORS[skill.category] || '#7c3aed',
        skills: [],
      }
    }
    acc[skill.category].skills.push(skill)
    return acc
  }, {})
}
