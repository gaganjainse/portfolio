export interface ExperienceItem {
  title: string
  company: string
  period: string
  location?: string
  description?: string
  bullets: string[]
  tags: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Industry 5.0 Industrial Automation Trainee',
    company: 'CodenPlay Robotics',
    period: 'Aug – Nov 2025',
    location: 'VIT Vellore / Online',
    bullets: [
      'Built and debugged PLC automation logic (ladder logic, structured text) in CODESYS',
      'Simulated industrial process workflows in Factory I/O',
      'Implemented flow-based control/integration in Node-RED',
      'Covered HMI design, industrial communication, process monitoring, and the debugging→testing→deployment workflow',
    ],
    tags: ['CODESYS', 'Factory I/O', 'Node-RED', 'PLC', 'HMI', 'Industrial IoT'],
  },
]
