import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const source = "https://ui.shadcn.com/r/styles/new-york-v4"
const checkOnly = process.argv.includes("--check")
const registry = await fetchJson(`${source}/registry.json`)
const components = registry.items.filter((item) => item.type === "registry:ui")
const blocks = registry.items.filter((item) => item.type === "registry:block")
const snapshotPath = join(process.cwd(), "registry", "shadcn-snapshot.json")
const blocksDir = join(process.cwd(), "registry", "blocks")

if (checkOnly) {
  if (!existsSync(snapshotPath)) fail("Registry snapshot is missing. Run pnpm registry:sync.")
  const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"))
  compare("components", snapshot.components, components.map(({ name }) => name))
  compare("blocks", snapshot.blocks, blocks.map(({ name }) => name))
  const missingSources = snapshot.blocks.filter((name) => !existsSync(join(blocksDir, `${name}.json`)))
  if (missingSources.length) fail(`Missing block payloads: ${missingSources.join(", ")}`)
  console.log(`Registry complete: ${components.length} components and ${blocks.length} blocks.`)
  process.exit(0)
}

mkdirSync(blocksDir, { recursive: true })
for (let index = 0; index < blocks.length; index += 8) {
  const batch = blocks.slice(index, index + 8)
  const payloads = await Promise.all(batch.map(({ name }) => fetchJson(`${source}/${name}.json`)))
  payloads.forEach((payload, offset) => {
    const name = batch[offset].name
    writeFileSync(join(blocksDir, `${name}.json`), `${JSON.stringify(payload, null, 2)}\n`)
  })
  console.log(`Downloaded ${Math.min(index + batch.length, blocks.length)} / ${blocks.length} blocks`)
}

const snapshot = {
  schemaVersion: 1,
  source: `${source}/registry.json`,
  retrievedAt: new Date().toISOString(),
  style: "new-york-v4",
  counts: { components: components.length, blocks: blocks.length },
  components: components.map(({ name }) => name),
  blocks: blocks.map(({ name }) => name),
}
mkdirSync(join(process.cwd(), "registry"), { recursive: true })
writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`)
console.log(`Saved ${components.length} components and ${blocks.length} complete block payloads.`)

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "user-agent": "mandalar-ui-registry-sync" } })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
  return response.json()
}

function compare(label, recorded, current) {
  const missing = current.filter((name) => !recorded.includes(name))
  const removed = recorded.filter((name) => !current.includes(name))
  if (missing.length || removed.length) fail(`${label} changed. New: ${missing.join(", ") || "none"}. Removed: ${removed.join(", ") || "none"}.`)
}

function fail(message) {
  console.error(message)
  process.exit(1)
}
