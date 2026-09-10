import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import snapshot from "@/registry/shadcn-snapshot.json"

function RegistryInventory() {
  return <div className="mx-auto max-w-6xl space-y-10"><header><p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Official snapshot</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">Complete registry inventory</h1><p className="mt-3 max-w-2xl text-muted-foreground">Every listed component is owned in source under components/ui. Every block retains its complete official registry payload under registry/blocks.</p></header><section><div className="mb-4 flex items-end justify-between"><h2 className="text-xl font-semibold">Components</h2><span className="font-mono text-sm text-muted-foreground">{snapshot.components.length}</span></div><div className="flex flex-wrap gap-2">{snapshot.components.map((name) => <span key={name} className="rounded-md border bg-card px-2.5 py-1.5 font-mono text-xs shadow-xs">{name}</span>)}</div></section><section><div className="mb-4 flex items-end justify-between"><h2 className="text-xl font-semibold">Blocks</h2><span className="font-mono text-sm text-muted-foreground">{snapshot.blocks.length}</span></div><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{snapshot.blocks.map((name) => <div key={name} className="rounded-lg border bg-card p-3"><p className="font-mono text-xs">{name}</p><p className="mt-1 text-xs text-muted-foreground">Complete source payload archived</p></div>)}</div></section></div>
}

const meta = { title: "Blocks/Registry Inventory", component: RegistryInventory, parameters: { layout: "fullscreen" } } satisfies Meta<typeof RegistryInventory>
export default meta
type Story = StoryObj<typeof meta>
export const CompleteSnapshot: Story = {}
