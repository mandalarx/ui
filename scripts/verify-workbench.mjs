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
    return { alpha: ctx.getImageData(0, 0, 1, 1).data[3], blur: style.backdropFilter, radius: style.borderRadius }
  })
}
try {
  for (const theme of process.argv.includes("--docs-only") ? [] : ["light", "dark"]) {
    for (const [device, width, height] of [["mobile", 390, 844], ["tablet", 768, 1024], ["desktop", 1440, 1000]]) {
      const page = await browser.newPage({ viewport: { width, height }, colorScheme: theme })
      page.on("pageerror", error => errors.push(error.message))
      await page.goto(`${base}/iframe.html?id=foundations-overview--system&viewMode=story`)
      await page.getByRole("heading", { name: "Light. In motion." }).waitFor()
      await page.evaluate(() => document.fonts.ready)
      assert.match(await page.getByRole("heading", { name: "Light. In motion." }).evaluate(el => getComputedStyle(el).fontFamily), /^"Geist Variable"/)
      assert.match(await page.locator("body").evaluate(el => getComputedStyle(el).fontFamily), /^"Inter Variable"/)
      assert(await page.evaluate(() => ["Geist Variable", "Inter Variable"].every(family => [...document.fonts].some(font => font.family.replaceAll('"', "") === family && font.status === "loaded"))), "Geist and Inter must load")
      assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), theme === "dark")
      assert.equal(await page.locator("html").evaluate(el => getComputedStyle(el).getPropertyValue("--primary").trim()), theme === "dark" ? "#58b4ff" : "#0069e8")
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${device} ${theme}: horizontal overflow`)
      await page.getByRole("button", { name: "Complete", exact: true }).click()
      assert.equal(await page.getByRole("slider").getAttribute("aria-valuenow"), "100")
      await page.screenshot({ path: `artifacts/visual/${device}-${theme}.png`, fullPage: true, animations: "disabled" })
      // Flat and ruled: cells are square, cards are 8px; both are opaque, unblurred, and cast no shadow.
      for (const [id, radius] of [["surface-cell", "0px"], ["surface-card", "8px"]]) {
        const surface = page.getByTestId(id)
        assert.deepEqual(await surfaceStyle(surface), { alpha: 255, blur: "none", radius }, `${id} must be flat`)
        assert.equal(await surface.evaluate(el => getComputedStyle(el).boxShadow), "none", `${id} must not cast a shadow`)
      }
      const input = page.getByRole("textbox", { name: "Collection name" })
      assert.equal(await input.evaluate(el => getComputedStyle(el).borderRadius), "8px")
      assert.equal((await surfaceStyle(input)).alpha, 255, "Inputs must stay opaque")
      // Bands draw ticks where their rule meets the rails, and only one brand panel moves.
      assert.match(await page.locator(".azure-band").first().evaluate(el => getComputedStyle(el, "::before").backgroundImage), /linear-gradient/, "Band ticks must render")
      assert.equal(await page.locator('[data-slot="caustics"]').evaluateAll(panels => panels.filter(panel => getComputedStyle(panel, "::before").animationName !== "none").length), 1, "Exactly one moving brand panel per view")
      // The signature ring is a static image that brightens on hover.
      const signature = page.getByRole("link", { name: "Browse components" })
      assert.match(await signature.evaluate(el => getComputedStyle(el, "::before").backgroundImage), /linear-gradient/, "Signature ring must render")
      assert.equal(await signature.evaluate(el => getComputedStyle(el, "::before").animationName), "none", "Signature ring must not animate at rest")
      await signature.hover()
      await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-variant="signature"]'), "::before").filter.includes("brightness"))
      await page.mouse.move(0, 0)
      const primaryButton = page.getByRole("button", { name: "Complete", exact: true })
      await primaryButton.hover()
      assert.equal(await primaryButton.evaluate(el => getComputedStyle(el).translate), "none", "Buttons must not lift on hover")
      await page.mouse.move(0, 0)
      await page.goto(`${base}/iframe.html?id=components-dialog--states&viewMode=story`)
      await page.getByRole("button", { name: "Edit collection" }).click()
      const dialog = page.getByRole("dialog")
      await dialog.waitFor()
      const bounds = await dialog.boundingBox()
      assert(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width + 1, "Dialog outside viewport")
      assert.equal(await dialog.evaluate(el => getComputedStyle(el).borderRadius), "12px")
      await page.screenshot({ path: `artifacts/visual/dialog-${device}-${theme}.png`, animations: "disabled" })
      await page.keyboard.press("Escape")
      await dialog.waitFor({ state: "hidden" })
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.getByRole("button", { name: "Edit collection" }).click()
      await dialog.waitFor()
      assert(await dialog.evaluate(el => parseFloat(getComputedStyle(el).animationDuration) < .001), "OS reduced motion ignored")
      await page.keyboard.press("Escape")
      assert(await page.getByRole("button", { name: "Edit collection" }).evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) < .001), "OS reduced motion must make button transitions instant")
      await page.emulateMedia({ reducedMotion: "no-preference" })
      await page.goto(`${base}/iframe.html?id=components-dropdown-menu--states&viewMode=story`)
      await page.getByRole("button", { name: "Collection actions" }).click()
      const menu = page.getByRole("menu")
      await menu.waitFor()
      assert.equal(await menu.evaluate(el => getComputedStyle(el).borderRadius), "8px")
      assert.equal((await surfaceStyle(menu)).alpha, 255, "Menus must be opaque")
      await page.screenshot({ path: `artifacts/visual/menu-${device}-${theme}.png`, animations: "disabled" })
      await page.goto(`${base}/iframe.html?id=blocks-full-pages--dashboard-01&viewMode=story`)
      await page.getByRole("table").waitFor()
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Dashboard overflow: ${device} ${theme}`)
      // Recharts uses JavaScript for its 1500ms entrance; screenshot's animation option only stops CSS.
      await page.waitForTimeout(1700)
      await page.screenshot({ path: `artifacts/visual/dashboard-${device}-${theme}.png`, fullPage: true, animations: "disabled" })
      await page.goto(`${base}/iframe.html?id=foundations-effects--pointer-light&viewMode=story`)
      const lit = page.getByTestId("lit-card")
      await lit.waitFor()
      assert.deepEqual(await surfaceStyle(lit), { alpha: 255, blur: "none", radius: "8px" }, "Pointer light must not change the card")
      const litBox = await lit.boundingBox()
      await page.mouse.move(litBox.x + litBox.width * .3, litBox.y + 8)
      await page.waitForFunction(() => document.querySelector('[data-testid="lit-card"]').hasAttribute("data-lit"))
      await page.screenshot({ path: `artifacts/visual/effects-pointer-${device}-${theme}.png`, animations: "disabled" })
      await page.goto(`${base}/iframe.html?id=foundations-effects--caustics-surface&viewMode=story`)
      await page.getByRole("heading", { name: "One field of light." }).waitFor()
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Caustics overflow: ${device} ${theme}`)
      await page.screenshot({ path: `artifacts/visual/effects-caustics-${device}-${theme}.png`, animations: "disabled" })
      await page.emulateMedia({ reducedMotion: "reduce" })
      assert.equal(await page.locator('[data-slot="caustics"]').evaluate(el => getComputedStyle(el, "::before").animationName), "none", "OS reduced motion must still the caustics")
      await page.emulateMedia({ reducedMotion: "no-preference" })
      if (device === "desktop") {
        await page.goto(`${base}/iframe.html?id=foundations-overview--motion&viewMode=story`)
        await page.getByRole("heading", { name: "Responsive by nature." }).waitFor()
        await page.emulateMedia({ reducedMotion: "reduce" })
        await page.getByTestId("motion-sample").nth(1).hover()
        await page.waitForFunction(() => getComputedStyle(document.querySelectorAll('[data-testid="motion-sample"]')[1]).transform === "none")
        await page.emulateMedia({ reducedMotion: "no-preference" })
        await page.getByTestId("motion-sample").nth(2).hover()
        await page.waitForFunction(() => getComputedStyle(document.querySelectorAll('[data-testid="motion-sample"]')[2]).transform !== "none")
        await page.goto(`${base}/iframe.html?id=foundations-overview--motion&viewMode=story&globals=motion:reduced`)
        await page.getByTestId("motion-sample").first().hover()
        await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-testid="motion-sample"]')).transform === "none")
      }
      await page.close()
      console.log(`Verified ${device} / ${theme}: type, flat surfaces, controls, overlays, dashboard, reduced motion`)
    }
  }
  const manager = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "dark" })
  manager.on("pageerror", error => errors.push(error.message))
  await manager.goto(`${base}/?path=/story/foundations-overview--system`)
  await manager.frameLocator("#storybook-preview-iframe").getByRole("heading", { name: "Light. In motion." }).waitFor()
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
