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

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    margin: { top: '20mm', right: '0', bottom: '15mm', left: '0' },
    // Note: Chrome's header/footer template layer does not support
    // background-clip:text, so gradients are approximated with solid brand
    // colors (violet #8b5cf6 and cyan #06b6d4) plus a gradient border line.
    headerTemplate: `<div style="font-size: 9pt; font-weight: 600; padding-bottom: 4px; padding-top: 10mm; padding-left: 16mm; padding-right: 16mm; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #8b5cf6; background: linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%) bottom / 100% 1.5px no-repeat;"><span style="color: #8b5cf6;">Gagan Jain — AI / LLM Engineer</span><span style="color: #64748b; font-weight: 500;">gagan.jain.se@gmail.com &nbsp;|&nbsp; +91 95872 55792</span></div>`,
    footerTemplate: `<div style="font-size: 8pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 4px; text-align: center; padding-bottom: 10mm;">Page <span class="pageNumber"></span> &nbsp;|&nbsp; <span style="color: #06b6d4;">https://gaganjain.vercel.app</span></div>`,
  })

  await browser.close()
  console.log(`PDF generated: ${pdfPath}`)
}

generatePdf().catch((err) => {
  console.error(err)
  process.exit(1)
})
