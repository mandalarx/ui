import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"

const root = process.cwd()
const payloadDir = join(root, "registry", "blocks")
const outputDir = join(root, "blocks")
const entries = []

for (const filename of readdirSync(payloadDir).filter((name) => name.endsWith(".json")).sort()) {
  const payload = JSON.parse(readFileSync(join(payloadDir, filename), "utf8"))
  const name = payload.name
  let entry

  for (const file of payload.files) {
    const marker = `/blocks/${name}/`
    const relative = file.path.includes(marker)
      ? file.path.split(marker)[1]
      : payload.files.length === 1
        ? "index.tsx"
        : basename(file.path)
    const destination = join(outputDir, name, relative)
    const content = rewriteImports(file.content, name)
    mkdirSync(dirname(destination), { recursive: true })
    // Local blocks are owned by this design system. New snapshots never overwrite adaptations.
    if (!existsSync(destination)) writeFileSync(destination, `${content.trim()}\n`)

    if (relative === "page.tsx" || payload.files.length === 1) {
      const named = content.match(/export function\s+([A-Za-z0-9_]+)/)?.[1]
      entry = {
        name,
        importPath: `@/blocks/${name}/${relative.replace(/\.tsx$/, "")}`,
        exportName: /export default\s/.test(content) ? "default" : named,
      }
    }
  }

  if (!entry?.exportName) throw new Error(`Could not identify the main export for ${name}`)
  entries.push(entry)
}

const imports = entries.map((entry) => {
  const alias = `Block${pascal(entry.name)}`
  return entry.exportName === "default"
    ? `import ${alias} from "${entry.importPath}"`
    : `import { ${entry.exportName} as ${alias} } from "${entry.importPath}"`
}).join("\n")

const stories = entries.map((entry) => {
  const alias = `Block${pascal(entry.name)}`
  return `export const ${pascal(entry.name)}: Story = { name: "${entry.name}", render: () => <BlockFrame><${alias} /></BlockFrame> }`
}).join("\n")

writeFileSync(join(root, "stories", "blocks.generated.stories.tsx"), `${imports}
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

function BlockFrame({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full bg-background text-foreground">{children}</div>
}

const meta = {
  title: "Blocks/Full Pages",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

${stories}
`)

console.log(`Materialized ${entries.length} isolated blocks and generated their Storybook stories.`)

function rewriteImports(content, name) {
  return content
    .replaceAll(`@/registry/new-york-v4/blocks/${name}/`, `@/blocks/${name}/`)
    .replaceAll("@/registry/new-york-v4/ui/", "@/components/ui/")
    .replaceAll("@/registry/new-york-v4/hooks/", "@/hooks/")
    .replaceAll("@/registry/new-york-v4/lib/", "@/lib/")
    .replaceAll('from "cn"', 'from "@/lib/utils"')
}

function pascal(value) {
  return value.split(/[^A-Za-z0-9]+/).map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`).join("")
}
