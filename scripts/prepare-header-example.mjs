import { cp, mkdir, mkdtemp } from "node:fs/promises"
import { resolve, dirname } from "node:path"
import { tmpdir } from "node:os"
import { fileURLToPath } from "node:url"
const root = fileURLToPath(new URL("../", import.meta.url))
// An explicit destination must not exist, preventing accidental overwrites.
const destination = process.argv[2] ? resolve(process.argv[2]) : await mkdtemp(resolve(tmpdir(), "mandalar-header-"))
if (process.argv[2]) await mkdir(destination)
await cp(resolve(root, "examples/header-vite"), destination, { recursive: true })
const files = ["components/header.tsx", "components/ui/button.tsx", "components/ui/navigation-menu.tsx", "components/ui/sheet.tsx", "components/ui/accordion.tsx", "lib/utils.ts", "app/globals.css", "vendor/shadcn-tailwind-4.13.0.css"]
for (const file of files) {
  await mkdir(dirname(resolve(destination, file)), { recursive: true })
  await cp(resolve(root, file), resolve(destination, file))
}
console.log(destination)
