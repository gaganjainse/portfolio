# GitHub Repo Creation — Manual Steps

Since I cannot authenticate to GitHub from this environment, please follow these steps:

## 1. Create Portfolio Repository

1. Go to https://github.com/new
2. Repository name: `portfolio`
3. Visibility: Public
4. Do NOT add a README (we already have one)
5. Click "Create repository"
6. Run these commands in your terminal:

```bash
cd C:\Users\gagan\Desktop\CareerOps\projects\portfolio
git remote add origin https://github.com/gaganjainse/portfolio.git
git branch -M main
git push -u origin main
```

## 2. Create Profile README Repository

1. Go to https://github.com/new
2. Repository name: `gaganjainse` (must match your username exactly)
3. Visibility: Public
4. Check "Add a README file"
5. Click "Create repository"
6. Edit the README.md online or clone and push:

```bash
cd /tmp
git clone https://github.com/gaganjainse/gaganjainse.git
cd gaganjainse
```

Then replace the README.md content with:

```markdown
# Hi, I'm Gagan Jain 👋

Computer Science student at VIT Vellore (expected July 2026) building full-stack web applications, developer tooling, and AI/LLM projects.

## 🔭 Flagship: [Vyākṛti](https://github.com/gaganjainse/Vyakrti)
A Sanskrit-oriented programming language with a complete compiler pipeline and browser-based IDE. Built from scratch in Rust + React.

## 🚀 Also Built: [AIM](https://github.com/gaganjainse/AIM)
Production-hardened attendance management system. Flask + MySQL + Docker + CI/CD.

## 🛠️ Tech Stack
**Languages:** Python · JavaScript · TypeScript · Rust · C · C++
**Frontend:** React · React Native · Tailwind CSS
**Backend:** Node.js · Express · Flask · Axum (Rust)
**Databases:** MySQL · MongoDB
**Tools:** Git · Docker · Monaco Editor · Linux

## 📫 Reach me
- Email: gagan.jain.se@gmail.com
- LinkedIn: linkedin.com/in/gagan-jain-a88aab345
- Location: Vellore, India · Open to relocation

*Seeking entry-level Software Engineer / Full Stack Developer roles.*
```

Then:
```bash
git add README.md
git commit -m "feat: add profile README"
git push origin main
```

## 3. After Creating Both Repos

Let me know and I will:
- Update the Notion pages with the correct GitHub repo URLs
- Help connect the portfolio repo to Vercel
