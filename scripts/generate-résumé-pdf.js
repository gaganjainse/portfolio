import puppeteer from 'puppeteer'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const htmlPath = join(__dirname, '..', 'public', 'resume.html')
const pdfPath = join(__dirname, '..', 'public', 'resume.pdf')

async function generatePdf() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.CHROME_PATH || (await puppeteer.executablePath()),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 794, height: 1123 })
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' })

  // No header/footer — the résumé renders with clean page margins only.
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '16mm', right: '15mm', bottom: '16mm', left: '15mm' },
  })

  await browser.close()
  console.log(`PDF generated: ${pdfPath}`)
}

generatePdf().catch((err) => {
  console.error(err)
  process.exit(1)
})
