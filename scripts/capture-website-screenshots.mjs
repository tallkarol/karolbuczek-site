import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, "../public/website-builds")

const sites = [
  { url: "https://mineralife-frontend.vercel.app/", file: "mineralife-b2b.png", name: "Mineralife B2B" },
  { url: "https://domynova.com/", file: "domy-nova.png", name: "Domy Nova" },
  { url: "https://zemvelo.com/", file: "zemvelo.png", name: "Zemvelo" },
  { url: "https://capsfieldhouse.com/", file: "caps-fieldhouse.png", name: "CAPS Fieldhouse" },
]

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()

for (const site of sites) {
  console.log("Capturing", site.name, "...")
  try {
    // Prefer networkidle, but some sites never settle (analytics). Fall back to load.
    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 45000 })
    } catch {
      await page.goto(site.url, { waitUntil: "load", timeout: 90000 })
    }
    await page.waitForTimeout(8000)

    try {
      await page.evaluate(() => {
        const texts = ["Accept", "OK", "Agree", "Got it", "Allow", "Akceptuj", "No"]
        const buttons = Array.from(document.querySelectorAll("button, a"))
        for (const b of buttons) {
          const t = (b.textContent || "").trim()
          if (texts.some((x) => t === x || t.toLowerCase() === x.toLowerCase())) {
            b.click()
            return
          }
        }
      })
      await page.waitForTimeout(800)
    } catch {
      // ignore cookie dismissal failures
    }

    // Wait for hero/above-the-fold images to finish loading
    await page.evaluate(async () => {
      const imgs = Array.from(document.images).filter((img) => {
        const rect = img.getBoundingClientRect()
        return rect.bottom > 0 && rect.top < window.innerHeight
      })
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener("load", resolve, { once: true })
                img.addEventListener("error", resolve, { once: true })
              })
        )
      )
    })
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({
      path: path.join(outDir, site.file),
      fullPage: false,
      type: "png",
    })
    console.log("OK", site.file)
  } catch (e) {
    console.error("FAIL", site.name, e.message)
  }
}

await browser.close()
console.log("Done")
