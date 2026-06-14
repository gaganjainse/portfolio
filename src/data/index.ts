export interface Project {
  name: string;
  tag: string;
  description: string;
  details?: string[];
  stack: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  image?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const SITE_CONFIG = {
  name: "Gagan Jain",
  title: "Software Engineer",
  tagline: "Building full-stack apps, developer tooling, and AI/LLM projects",
  description: "Computer Science student at VIT Vellore building full-stack web applications, developer tooling, and AI/LLM projects. Creator of Vyākṛti — a Sanskrit-oriented programming language with a browser-based IDE.",
  email: "gagan.jain.se@gmail.com",
  location: "Vellore, India",
  availability: "Open to SWE roles · Open to relocation",
  graduation: "Expected July 2026",
  cgpa: "7.5/10",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/gaganjainse", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/gagan-jain-se", icon: "linkedin" },
  { name: "Email", url: "mailto:gagan.jain.se@gmail.com", icon: "email" },
];

export const PROJECTS: Project[] = [
  {
    name: "Vyākṛti",
    tag: "FLAGSHIP",
    description: "A Sanskrit-oriented programming language with a complete compiler pipeline and browser-based IDE.",
    details: [
      "Complete compiler pipeline: lexer → parser → type checker → bytecode compiler — all built from scratch in Rust",
      "Browser-based IDE with React, Monaco Editor, syntax highlighting, autocomplete, and diagnostics",
      "Rust (axum) backend with compile, REPL, LSP, and file management endpoints via REST + WebSocket",
      "123 tests covering the full pipeline, including a self-hosting corpus",
    ],
    stack: ["Rust", "React", "TypeScript", "Monaco Editor", "Zustand", "Tailwind CSS", "Axum"],
    github: "https://github.com/gaganjainse/Vyakrti",
    demo: "https://vyakrti.vercel.app",
    featured: true,
    image: "/images/vyakrti.png",
  },
  {
    name: "AIM",
    tag: "PRODUCTION-READY",
    description: "Full-stack attendance management system with production-grade security and DevOps.",
    details: [
      "Argon2id auth (OWASP 2025), CSRF protection, brute-force lockout, breached-password detection",
      "Reporting with Chart.js, FullCalendar, light/dark themes, CSV import/export, encrypted backups",
      "Prometheus monitoring, 101 tests, Docker Compose deployment, full CI/CD pipeline",
      "WCAG 2.1 AA accessibility compliant with ARIA live regions and keyboard navigation",
    ],
    stack: ["Python", "Flask", "MySQL", "Bootstrap", "Chart.js", "Docker", "GitHub Actions"],
    github: "https://github.com/gaganjainse/AIM",
    demo: "https://aim-demo.vercel.app",
    featured: true,
    image: "/images/aim.png",
  },
  {
    name: "Food Delivery App",
    tag: "MOBILE",
    description: "Cross-platform mobile app with authentication, restaurant browsing, ordering, and tracking.",
    stack: ["React Native", "Node.js", "MongoDB Atlas"],
    github: "https://github.com/gaganjainse",
    image: "/images/food-delivery.png",
  },
  {
    name: "Sentiment Analysis",
    tag: "AI/ML",
    description: "Facial-recognition-based emotion detection using YOLO and computer vision.",
    stack: ["Python", "YOLO", "OpenCV", "Machine Learning"],
    github: "https://github.com/gaganjainse",
    image: "/images/sentiment.png",
  },
  {
    name: "IoT House Security",
    tag: "IoT",
    description: "Raspberry Pi security node with sensors and cameras for real-time monitoring.",
    stack: ["Raspberry Pi", "Python", "Sensors", "Camera"],
    github: "https://github.com/gaganjainse",
    image: "/images/iot-security.png",
  },
  {
    name: "RFID Access Control",
    tag: "IoT + ML",
    description: "Embedded access-control prototype with Python ML for behavioral analysis.",
    stack: ["Arduino", "RFID", "Python", "Machine Learning"],
    github: "https://github.com/gaganjainse",
    image: "/images/rfid.png",
  },
];

export const SKILLS: Skill[] = [
  // Languages
  { name: "Python", level: 90, category: "Languages" },
  { name: "JavaScript", level: 85, category: "Languages" },
  { name: "TypeScript", level: 80, category: "Languages" },
  { name: "Rust", level: 70, category: "Languages" },
  { name: "C++", level: 65, category: "Languages" },
  { name: "C", level: 60, category: "Languages" },
  
  // Frontend
  { name: "React", level: 90, category: "Frontend" },
  { name: "React Native", level: 70, category: "Frontend" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
  { name: "Bootstrap", level: 80, category: "Frontend" },
  { name: "Monaco Editor", level: 75, category: "Frontend" },
  
  // Backend
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Flask", level: 90, category: "Backend" },
  { name: "Express", level: 75, category: "Backend" },
  { name: "Axum (Rust)", level: 70, category: "Backend" },
  { name: "REST APIs", level: 85, category: "Backend" },
  { name: "WebSockets", level: 70, category: "Backend" },
  
  // Databases
  { name: "MySQL", level: 85, category: "Databases" },
  { name: "MongoDB", level: 75, category: "Databases" },
  { name: "Redis", level: 60, category: "Databases" },
  
  // DevOps
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "GitHub Actions", level: 80, category: "DevOps" },
  { name: "Nginx", level: 70, category: "DevOps" },
  { name: "Gunicorn", level: 70, category: "DevOps" },
  { name: "Prometheus", level: 65, category: "DevOps" },
  { name: "Linux", level: 75, category: "DevOps" },
  
  // AI/ML
  { name: "YOLO", level: 70, category: "AI/ML" },
  { name: "OpenCV", level: 65, category: "AI/ML" },
  { name: "NLP", level: 60, category: "AI/ML" },
  { name: "Ollama", level: 65, category: "AI/ML" },
  { name: "Computer Vision", level: 65, category: "AI/ML" },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Industry 5.0 Industrial Automation Trainee",
    company: "CodenPlay Robotics",
    location: "VIT Vellore / Online",
    duration: "Aug – Nov 2025",
    description: "Built and debugged PLC automation logic and simulated process workflows.",
    highlights: [
      "Built and debugged PLC automation logic (ladder logic, structured text) in CODESYS",
      "Simulated industrial process workflows in Factory I/O",
      "Implemented flow-based control/integration in Node-RED",
      "Covered HMI design, industrial communication, process monitoring, and the debugging→testing→deployment workflow",
    ],
    tags: ["CODESYS", "Factory I/O", "Node-RED", "PLC", "HMI", "Industrial IoT"],
  },
];

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
