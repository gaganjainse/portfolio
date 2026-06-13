export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Gagan Jain · Built with React + Vite + Tailwind CSS
        </p>
        <p className="text-text-muted/50 text-xs mt-2">
          Deployed on Vercel
        </p>
      </div>
    </footer>
  )
}
