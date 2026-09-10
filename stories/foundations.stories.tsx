import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { motion } from "motion/react"

const palette = [
  ["Primary", "bg-primary", "text-primary-foreground"],
  ["Graphite", "bg-foreground", "text-background"],
  ["Teal", "bg-chart-2", "text-foreground"],
  ["Amber", "bg-chart-3", "text-foreground"],
  ["Magenta", "bg-chart-4", "text-primary-foreground"],
]

function Foundations() {
  return <div className="mx-auto max-w-5xl space-y-12">
    <header><p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Mandalar UI</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">Foundations</h1><p className="mt-3 max-w-2xl text-muted-foreground">Graphite gives product surfaces restraint. Violet carries action and identity. Semantic tokens keep both themes consistent.</p></header>
    <section><h2 className="mb-4 text-lg font-semibold">Color</h2><div className="grid gap-3 sm:grid-cols-5">{palette.map(([name, bg, fg], index) => <motion.div key={name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className={`flex h-28 items-end rounded-xl p-3 shadow-sm ${bg} ${fg}`}><span className="text-sm font-medium">{name}</span></motion.div>)}</div></section>
    <section className="grid gap-6 rounded-xl border bg-card p-6 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">Interface / Manrope</p><p className="mt-3 text-3xl font-semibold tracking-[-0.035em]">Clear hierarchy at every size.</p><p className="mt-3 leading-7 text-muted-foreground">Designed for focused workflows, readable forms, and dense product surfaces.</p></div><div className="font-mono"><p className="text-sm text-muted-foreground">Code & data / IBM Plex Mono</p><p className="mt-3 text-lg">const radius = 10</p><p className="mt-3 text-sm text-muted-foreground">0123456789 · 120–340ms</p></div></section>
    <section><h2 className="mb-4 text-lg font-semibold">Motion</h2><div className="flex flex-wrap gap-4">{[120, 200, 340].map((duration) => <motion.div key={duration} className="grid size-28 place-items-center rounded-xl border bg-accent text-accent-foreground" whileHover={{ y: -6, rotate: 1.5, scale: 1.025 }} transition={{ duration: duration / 1000 }}><span className="font-mono text-sm">{duration}ms</span></motion.div>)}</div><p className="mt-4 text-sm text-muted-foreground">Fast feedback, standard controls, and emphasized entrances. Reduced-motion preferences collapse all three.</p></section>
  </div>
}

const meta = { title: "Foundations/Overview", component: Foundations, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Foundations>
export default meta
type Story = StoryObj<typeof meta>
export const System: Story = {}
