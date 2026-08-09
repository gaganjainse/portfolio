// Rasterize public/favicon.svg into PNG favicons at multiple sizes using
// Chromium, then build favicon.ico.
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFileSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = join(__dirname, '..', 'public', 'favicon.svg')
const outDir = join(__dirname, '..', 'public')

const sizes = [16, 32, 192, 512]

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: process.env.CHROME_PATH || (await puppeteer.executablePath()),
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const size of sizes) {
  const page = await browser.newPage()
  await page.setViewport({ width: size, height: size })
  // Render the SVG at the exact target size with crisp scaling
  const html = `<body style="margin:0;background:transparent">
    <img src="file://${svgPath}" width="${size}" height="${size}" style="image-rendering:auto;display:block">
  </body>`
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const png = await page.screenshot({ type: 'png', omitBackground: true })
  const file = join(outDir, `favicon-${size}.png`)
  writeFileSync(file, png)
  console.log(`wrote favicon-${size}.png (${png.length} bytes)`)
  await page.close()
}

await browser.close()

// Build favicon.ico from the 32px PNG (via Pillow if available)
try {
  const script = `
import struct, sys
from PIL import Image
img = Image.open('${join(outDir, 'favicon-32.png').replace(chr(39), '')}').convert('RGBA')
# ICO header (1 image)
width = img.width if img.width < 256 else 0
height = img.height if img.height < 256 else 0
header = struct.pack('<HHH', 0, 1, 1)
# image entry: width, height, colors=0, reserved=0, planes=1, bpp=32, size, offset=22
raw = img.tobytes()
entry = struct.pack('<BBBBHHII', width, height, 0, 0, 1, 32, len(raw), 22)
# AND mask (all transparent)
and_mask = b'\\x00' * (img.width * img.height // 8)
with open('${join(outDir, 'favicon.ico')}', 'wb') as f:
    f.write(header + entry + raw + and_mask)
print('wrote favicon.ico')
`
  execSync(`python3 -c ${JSON.stringify(script)}`)
} catch (e) {
  console.log('ico skipped:', e.message.slice(0, 80))
}
