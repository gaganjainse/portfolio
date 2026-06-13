#!/bin/bash
# Run this script to create both GitHub repos and push the portfolio

echo "=== Step 1: Create GitHub Portfolio Repo ==="
echo "Go to https://github.com/new and create a repo named 'portfolio' (public, no README)"
echo "Then come back and press Enter..."
read

echo ""
echo "=== Step 2: Push Portfolio Code ==="
cd "C:\Users\gagan\Desktop\CareerOps\projects\portfolio"
git add -A
git commit -m "feat: portfolio site — React + Vite + Tailwind"
git branch -M main
git remote add origin https://github.com/gaganjainse/portfolio.git
git push -u origin main

echo ""
echo "=== Step 3: Create GitHub Profile README Repo ==="
echo "Go to https://github.com/new and create a repo named 'gaganjainse' (public, WITH README)"
echo "Then come back and press Enter..."
read

echo ""
echo "=== Step 4: Add Profile README Content ==="
cd /tmp
git clone https://github.com/gaganjainse/gaganjainse.git
cd gaganjainse

cat > README.md << 'READMEEOF'
# Hi, I'm Gagan Jain 👋

Computer Science student at VIT Vellore (expected July 2026) building full-stack web applications, developer tooling, and AI/LLM projects.

## 🔭 Flagship Project: [Vyākṛti](https://github.com/gaganjainse/Vyakrti)

A Sanskrit-oriented programming language with a complete compiler pipeline and browser-based IDE.

- **Language:** Custom lexer/parser, semantic type checker, bytecode compiler, stack-based VM — all built from scratch in Rust
- **Web IDE:** React + Monaco Editor + Zustand + Tailwind CSS, backed by an Axum (Rust) server
- **123 tests** covering the full pipeline, including a self-hosting corpus

## 🚀 Also Built: [AIM](https://github.com/gaganjainse/AIM)

A production-hardened attendance management system built with Flask + MySQL.

- Argon2id auth, CSRF protection, brute-force lockout, security headers
- Reporting with Chart.js, FullCalendar, light/dark themes
- Prometheus monitoring, 84 tests, Docker deployment, full CI/CD pipeline

## 🛠️ Tech Stack

| | |
|---|---|
| **Languages** | Python · JavaScript · TypeScript · Rust · C · C++ |
| **Frontend** | React · React Native · Tailwind CSS · Bootstrap |
| **Backend** | Node.js · Express · Flask · Axum (Rust) |
| **Databases** | MySQL · MongoDB |
| **Tools** | Git · Docker · Monaco Editor · VS Code · Linux |
| **Other** | YOLO · IoT (Raspberry Pi, Arduino) · Prometheus |

## 📫 Reach me

- Email: gagan.jain.se@gmail.com
- LinkedIn: [linkedin.com/in/gagan-jain-a88aab345](https://linkedin.com/in/gagan-jain-a88aab345)
- Location: Vellore, India · Open to relocation

---

*Currently seeking entry-level Software Engineer / Full Stack Developer roles.*
READMEEOF

git add README.md
git commit -m "feat: add profile README"
git push origin main

echo ""
echo "=== Done! ==="
echo "Portfolio repo: https://github.com/gaganjainse/portfolio"
echo "Profile README: https://github.com/gaganjainse/gaganjainse"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new and import the portfolio repo"
echo "2. Publish your CareerOps Notion pages"
