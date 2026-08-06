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
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 794, height: 1123 })
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })
  await browser.close()
  console.log(`PDF generated: ${pdfPath}`)
}

generatePdf().catch((err) => {
  console.error(err)
  process.exit(1)
})
