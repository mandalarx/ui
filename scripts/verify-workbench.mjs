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
try {
  for (const theme of process.argv.includes("--docs-only") ? [] : ["light", "dark"]) {
    for (const [device, width, height] of [["mobile", 390, 844], ["tablet", 768, 1024], ["desktop", 1440, 1000]]) {
      const page = await browser.newPage({ viewport: { width, height }, colorScheme: theme })
      page.on("pageerror", error => errors.push(error.message))
      await page.goto(`${base}/iframe.html?id=foundations-overview--system&viewMode=story`)
      await page.getByRole("heading", { name: "Precision. With a pulse." }).waitFor()
      await page.evaluate(() => document.fonts.ready)
      assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), theme === "dark")
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${device} ${theme}: horizontal overflow`)
      await page.getByRole("button", { name: "Complete", exact: true }).click()
      assert.equal(await page.getByRole("slider").getAttribute("aria-valuenow"), "100")
      await page.screenshot({ path: `artifacts/visual/${device}-${theme}.png`, fullPage: true, animations: "disabled" })
      await page.goto(`${base}/iframe.html?id=components-dialog--states&viewMode=story`)
      await page.getByRole("button", { name: "Edit collection" }).click()
      const dialog = page.getByRole("dialog")
      await dialog.waitFor()
      const bounds = await dialog.boundingBox()
      assert(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width + 1, "Dialog outside viewport")
      assert.equal(await dialog.evaluate(el => getComputedStyle(el).borderRadius), "20px")
      await page.keyboard.press("Escape")
      await dialog.waitFor({ state: "hidden" })
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.getByRole("button", { name: "Edit collection" }).click()
      await dialog.waitFor()
      assert(await dialog.evaluate(el => parseFloat(getComputedStyle(el).animationDuration) < .001), "OS reduced motion ignored")
      await page.close()
      console.log(`Verified ${device} / ${theme}: layout, theme, controls, dialog, reduced motion`)
    }
  }
  const manager = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "dark" })
  manager.on("pageerror", error => errors.push(error.message))
  await manager.goto(`${base}/?path=/story/foundations-overview--system`)
  await manager.frameLocator("#storybook-preview-iframe").getByRole("heading", { name: "Precision. With a pulse." }).waitFor()
  await manager.screenshot({ path: "artifacts/visual/storybook-manager.png", animations: "disabled" })
  await manager.goto(`${base}/?path=/docs/components-button--documentation`)
  try {
    await manager.frameLocator("#storybook-preview-iframe").getByRole("heading", { name: "Button", exact: true }).waitFor({ timeout: 10000 })
  } catch (error) {
    await manager.screenshot({ path: "artifacts/visual/docs-failure.png" })
    console.error(await manager.frameLocator("#storybook-preview-iframe").locator("body").innerText())
    throw error
  }
  await manager.screenshot({ path: "artifacts/visual/storybook-docs.png", animations: "disabled" })
  await manager.close()
  assert.deepEqual(errors, [], "Browser runtime errors")
} finally {
  await browser.close()
  await new Promise(resolve => server.close(resolve))
}
