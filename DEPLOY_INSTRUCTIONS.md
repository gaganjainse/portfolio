# Manual Steps Required — Portfolio Deployment & GitHub Setup

## Step 1: Deploy Portfolio to Vercel

### Option A: Using Vercel CLI (Recommended)
```bash
cd C:\Users\gagan\Desktop\CareerOps\projects\portfolio
npx vercel login
# Follow the browser login flow
npx vercel --yes --prod
```
Your site will be live at `https://portfolio-gaganjainse.vercel.app` (or similar).

### Option B: Using GitHub + Vercel Web UI
1. Create a new GitHub repo named `portfolio` at https://github.com/new
2. Push the code:
```bash
cd C:\Users\gagan\Desktop\CareerOps\projects\portfolio
git remote add origin https://github.com/gaganjainse/portfolio.git
git branch -M main
git push -u origin main
```
3. Go to https://vercel.com/new
4. Import the `portfolio` GitHub repo
5. Vercel auto-detects Vite — click Deploy

## Step 2: Create GitHub Profile README

1. Go to https://github.com/new
2. Create a repo named exactly: `gaganjainse` (must match your username)
3. Check "Add a README file"
4. Click "Create repository"
5. Edit the README.md and paste the content from the GitHub Bio page in Notion

## Step 3: Update Portfolio URL in Notion

Once the portfolio is deployed, update the "Portfolio: TBD" references in:
- Master Profile page
- Task List page

Replace "TBD — deploying to Vercel" with the actual Vercel URL.

## Step 4: Pin Repos on GitHub

1. Go to https://github.com/gaganjainse
2. Click "Customize your pins"
3. Pin these repos in order:
   - Vyākṛti
   - AIM
   - (Add other strong projects)

## Step 5: Add Screenshots to Vyākṛti

1. Run the Vyākṛti IDE locally
2. Take screenshots of:
   - Editor with Devanagari code
   - Compile output showing AST/bytecode
   - REPL session
3. Add screenshots to the Vyākṛti repo README
