import puppeteer from 'puppeteer'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const htmlPath = join(__dirname, '..', 'public', 'résumé.html')
const pdfPath = join(__dirname, '..', 'public', 'résumé.pdf')

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
    margin: { top: '20mm', right: '0', bottom: '15mm', left: '0' },
    headerTemplate: '<div style="font-size: 9pt; color: #7c3aed; font-weight: 600; border-bottom: 1.5px solid #7c3aed; padding-bottom: 4px; padding-top: 10mm; padding-left: 16mm; padding-right: 16mm;">Gagan Jain — AI / LLM Engineer | gagan.jain.se@gmail.com | +91 95872 55792</div>',
    footerTemplate: '<div style="font-size: 8pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 4px; text-align: center; padding-bottom: 10mm;">Page <span class="pageNumber"></span> | https://gaganjain.vercel.app</div>',
  })
  await browser.close()
  console.log(`PDF generated: ${pdfPath}`)
}

generatePdf().catch((err) => {
  console.error(err)
  process.exit(1)
})
