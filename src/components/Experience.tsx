export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 bg-bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="text-primary-light">Experience</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-12" />

        <div className="bg-bg-card border border-border rounded-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-text">Industry 5.0 Industrial Automation Trainee</h3>
              <p className="text-primary-light font-medium">CodenPlay Robotics</p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm bg-bg border border-border text-text-muted">
              Aug – Nov 2025
            </span>
          </div>

          <p className="text-text-muted text-sm mb-4">VIT Vellore / Online · Training Internship (Approved) · Mentor: Dr. Konguvel E</p>

          <ul className="space-y-3">
            {[
              'Built and debugged PLC automation logic using ladder logic and structured text in CODESYS',
              'Simulated industrial process workflows in Factory I/O and implemented flow-based control/integration in Node-RED',
              'Covered HMI design concepts, industrial communication protocols, process monitoring, and the debugging–testing–deployment workflow',
            ].map((item, i) => (
              <li key={i} className="text-text-muted flex items-start gap-3">
                <span className="text-primary mt-1.5 shrink-0">▸</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {['CODESYS', 'Factory I/O', 'Node-RED', 'PLC', 'HMI', 'Industrial IoT'].map(tech => (
              <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-bg text-text-muted border border-border">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm">
            B.Tech Computer Science — VIT Vellore · Expected July 2026 · CGPA 7.5+
          </p>
        </div>
      </div>
    </section>
  )
}
