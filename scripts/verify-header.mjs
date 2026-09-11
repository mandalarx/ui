import { chromium } from "playwright"
import { createServer } from "node:http"
import { readFile, mkdir, stat } from "node:fs/promises"
import { resolve, extname, sep } from "node:path"
import assert from "node:assert/strict"

const root = resolve("out")
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".woff": "font/woff", ".woff2": "font/woff2", ".png": "image/png" }
const server = createServer(async (req, res) => {
  try {
    let file = resolve(root, `.${decodeURIComponent(new URL(req.url, "http://localhost").pathname)}`)
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html")
    res.setHeader("Content-Type", types[extname(file)] || "application/octet-stream")
    res.end(await readFile(file))
  } catch { res.writeHead(404).end() }
})
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve))
const base = process.env.ATELIER_BASE_URL || `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch()
await mkdir("artifacts/visual", { recursive: true })
const errors = []
async function surfaceStyle(locator) {
  return locator.evaluate(el => {
    const style = getComputedStyle(el)
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = style.backgroundColor
    ctx.fillRect(0, 0, 1, 1)
    return { alpha: ctx.getImageData(0, 0, 1, 1).data[3], blur: style.backdropFilter, radius: style.borderRadius, rule: style.borderBottomWidth }
  })
}
try {
  for (const theme of ["light", "dark"]) {
    for (const width of [390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: theme })
      page.on("pageerror", error => errors.push(error.message))
      await page.goto(`${base}/iframe.html?id=components-header--default&viewMode=story`)
      const brand = page.getByRole("link", { name: "Mandalar home" })
      await brand.waitFor()
      await page.evaluate(() => document.fonts.ready)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Header must fit viewport")
      // A flat, opaque band with a rule below, spanning the viewport.
      const style = await surfaceStyle(page.locator("header"))
      assert.deepEqual(style, { alpha: 255, blur: "none", radius: "0px", rule: "1px" }, `Header band: ${JSON.stringify(style)}`)
      assert.equal(Math.round((await page.locator("header").boundingBox()).width), await page.evaluate(() => document.documentElement.clientWidth), "Header band spans the viewport")
      await page.screenshot({ path: `artifacts/visual/header-${theme}-${width}.png`, animations: "disabled" })
      await page.evaluate(() => window.scrollTo(0, 300))
      assert.equal(Math.round((await page.locator("header").boundingBox()).y), 0)
      await page.evaluate(() => window.scrollTo(0, 0))
      if (width < 1024) {
        const trigger = page.getByRole("button", { name: "Open navigation" })
        await trigger.click()
        const dialog = page.getByRole("dialog", { name: "Navigation" })
        await dialog.waitFor()
        await dialog.getByRole("button", { name: "Product" }).click()
        await dialog.getByRole("link", { name: /Design system/ }).waitFor()
        await page.screenshot({ path: `artifacts/visual/header-menu-${theme}-${width}.png`, animations: "disabled" })
        await dialog.getByRole("link", { name: /Design system/ }).click()
        await dialog.waitFor({ state: "hidden" })
        assert(await trigger.evaluate(el => el === document.activeElement))
        await trigger.click()
        await dialog.getByRole("button", { name: "Close", exact: true }).waitFor()
        await page.locator('[data-slot="sheet-overlay"]').click({ position: { x: 5, y: 450 } })
        await dialog.waitFor({ state: "hidden" })
        assert(await trigger.evaluate(el => el === document.activeElement))
        await trigger.click()
        await page.setViewportSize({ width: 1440, height: 900 })
        await dialog.waitFor({ state: "hidden" })
        assert(await brand.evaluate(el => el === document.activeElement), "Resize restores focus to visible brand")
        assert.notEqual(await page.locator("body").evaluate(el => getComputedStyle(el).overflow), "hidden")
        await page.setViewportSize({ width, height: 900 })
        await page.emulateMedia({ reducedMotion: "reduce" })
        await trigger.click()
        await dialog.waitFor()
        assert(parseFloat(await dialog.evaluate(el => getComputedStyle(el).animationDuration)) < .001)
        await page.keyboard.press("Escape")
        await dialog.waitFor({ state: "hidden" })
      } else {
        await page.getByRole("button", { name: "Product" }).click()
        await page.getByRole("link", { name: /Design system/ }).waitFor()
        await page.screenshot({ path: `artifacts/visual/header-dropdown-${theme}-${width}.png`, animations: "disabled" })
        await page.keyboard.press("Escape")
      }
      await page.goto(`${base}/iframe.html?id=components-header--long-labels&viewMode=story`)
      await page.getByRole("link", { name: "Mandalar home" }).waitFor()
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Long labels must fit")
      if (width >= 1024) {
        await page.getByRole("button", { name: "Explore the complete platform" }).click()
        const bounds = await page.getByRole("link", { name: /Tools for distributed/ }).boundingBox()
        assert(bounds.x >= 0 && bounds.x + bounds.width <= width, "Dropdown must remain in viewport")
      }
      await page.close()
      console.log(`Header: ${theme}, ${width}px passed`)
    }
  }
  assert.deepEqual(errors, [])
} finally {
  await browser.close()
  await new Promise(resolve => server.close(resolve))
}
