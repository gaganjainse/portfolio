import puppeteer from 'puppeteer'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname, normalize } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// The PDF is generated from the *built* /resume page (dist/resume/index.html),
// so it always matches the web résumé. Run `npm run build` first.
const distDir = join(__dirname, '..', 'dist')
const pdfPath = join(__dirname, '..', 'public', 'resume.pdf')

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

// Serve the built site so absolute asset paths (/resume, /_astro/...) resolve.
function serve() {
  return createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      let filePath = normalize(join(distDir, urlPath))
      if (!filePath.startsWith(distDir)) {
        res.writeHead(403)
        res.end('Forbidden')
        return
      }
      const stat = await import('node:fs/promises').then((fs) => fs.stat(filePath))
      if (stat.isDirectory()) filePath = join(filePath, 'index.html')
      const body = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  })
}

async function generatePdf() {
  const server = serve()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.goto(`http://127.0.0.1:${port}/resume/`, { waitUntil: 'networkidle0' })
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
    })
  } finally {
    await browser.close()
    server.close()
  }
  console.log(`PDF written to ${pdfPath}`)
}

generatePdf().catch((err) => {
  console.error('Failed to generate PDF:', err.message)
  process.exit(1)
})
