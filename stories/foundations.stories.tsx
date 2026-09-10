import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { motion } from "motion/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RotateCcw, Sparkles, Layers, Check } from "lucide-react"

const palette = [
  ["Primary", "bg-primary", "text-primary-foreground"],
  ["Graphite", "bg-foreground", "text-background"],
  ["Porcelain", "bg-card", "text-card-foreground"],
  ["Lilac", "bg-accent", "text-accent-foreground"],
]

function Foundations() {
  const [completion, setCompletion] = useState([68])
  return <main className="mx-auto max-w-7xl space-y-10 px-5 py-8 sm:px-10 sm:py-12">
    <header className="flex items-center justify-between border-b pb-6"><span className="flex items-center gap-3 text-sm font-semibold"><span className="grid size-8 place-items-center rounded-[10px] bg-primary text-primary-foreground"><Layers className="size-4" /></span>Mandalar UI</span><Badge variant="outline" className="font-mono text-[10px] tracking-wider">DESIGN SYSTEM / 01</Badge></header>
    <section className="atelier-hero grid gap-10 rounded-[24px] border px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-14">
      <div><p className="mb-6 font-mono text-xs uppercase tracking-[.2em] text-primary">Violet Atelier</p><h1 className="text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl">Precision.<br /><span className="text-primary">With a pulse.</span></h1><p className="mt-6 max-w-md leading-7 text-muted-foreground">Graphite surfaces. Luminous violet. Motion you can feel. A complete set of shadcn primitives, composed with one visual language.</p><div className="mt-8 flex flex-wrap gap-2"><Badge variant="secondary">61 components</Badge><Badge variant="secondary">97 blocks</Badge><Badge variant="outline">Two coordinated themes</Badge></div></div>
      <Card className="border-primary/20"><CardHeader className="flex flex-row items-center justify-between"><div><p className="mb-2 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Live specimen</p><CardTitle className="text-xl">Make it yours.</CardTitle></div><Sparkles className="size-5 text-primary" /></CardHeader><CardContent className="space-y-6"><Tabs defaultValue="compose"><TabsList className="w-full"><TabsTrigger value="compose">Compose</TabsTrigger><TabsTrigger value="refine">Refine</TabsTrigger><TabsTrigger value="ship">Ship</TabsTrigger></TabsList><TabsContent value="compose" className="pt-5"><p className="text-sm leading-6 text-muted-foreground">Soft depth and precise edges give every interaction a place to land.</p></TabsContent><TabsContent value="refine" className="pt-5"><p className="text-sm leading-6 text-muted-foreground">Spring indicators follow your intent. Use the arrow keys to move between tabs.</p></TabsContent><TabsContent value="ship" className="pt-5"><p className="text-sm leading-6 text-muted-foreground">Every block inherits the same tokens, focus treatment, and motion rules.</p></TabsContent></Tabs><div className="flex items-center justify-between"><label htmlFor="specimen-switch" className="text-sm font-medium">State feedback</label><Switch id="specimen-switch" defaultChecked /></div><div><div className="mb-3 flex justify-between text-xs"><span className="text-muted-foreground">Completion</span><span className="font-mono">{completion[0]}%</span></div><Slider aria-label="Completion" value={completion} onValueChange={setCompletion} /></div><div className="flex gap-3 border-t pt-5"><Button className="flex-1" onClick={() => setCompletion([100])}><Check />Complete</Button><Button variant="outline" aria-label="Reset completion" onClick={() => setCompletion([0])}><RotateCcw /></Button></div></CardContent></Card>
    </section>
    <section><h2 className="mb-4 text-lg font-semibold">Color</h2><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{palette.map(([name, bg, fg]) => <motion.div key={name} className={`flex h-28 items-end rounded-xl p-3 shadow-sm ${bg} ${fg}`}><span className="text-sm font-medium">{name}</span></motion.div>)}</div></section>
    <section className="grid gap-6 rounded-xl border bg-card p-6 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">Interface / Manrope</p><p className="mt-3 text-3xl font-semibold tracking-[-0.035em]">Clear hierarchy at every size.</p><p className="mt-3 leading-7 text-muted-foreground">Designed for focused workflows, readable forms, and dense product surfaces.</p></div><div className="font-mono"><p className="text-sm text-muted-foreground">Code & data / IBM Plex Mono</p><p className="mt-3 text-lg">const radius = 10</p><p className="mt-3 text-sm text-muted-foreground">0123456789 · 120–340ms</p></div></section>
    <section><h2 className="mb-4 text-lg font-semibold">Motion</h2><div className="flex flex-wrap gap-4">{[120, 200, 340].map((duration) => <motion.div key={duration} className="grid size-28 place-items-center rounded-xl border bg-accent text-accent-foreground" whileHover={{ y: -6, rotate: 1.5, scale: 1.025 }} transition={{ duration: duration / 1000 }}><span className="font-mono text-sm">{duration}ms</span></motion.div>)}</div><p className="mt-4 text-sm text-muted-foreground">Fast feedback, standard controls, and emphasized entrances. Reduced-motion preferences collapse all three.</p></section>
  </main>
}

function MotionReference() {
  const [replay, setReplay] = useState(0)
  return <main className="mx-auto max-w-4xl space-y-8 p-6 sm:p-10"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">Violet Atelier / Motion</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">Responsive by nature.</h1></div><Button variant="outline" onClick={() => setReplay(replay + 1)}><RotateCcw />Replay</Button></header><p className="max-w-2xl leading-7 text-muted-foreground">Controls respond immediately. Surfaces settle gently. Entrances replay here only when you ask.</p><div key={replay} className="grid gap-4 sm:grid-cols-3">{[{ title: "Touch", detail: "120ms · Immediate feedback", duration: .12 }, { title: "Travel", detail: "200ms · State transitions", duration: .2 }, { title: "Arrive", detail: "340ms · Layered surfaces", duration: .34 }].map((item) => <Card key={item.title}><CardContent className="space-y-6 pt-6"><div className="flex h-24 items-center justify-center rounded-xl bg-muted"><motion.div initial={{ opacity: 0, y: 18, scale: .8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: item.duration }} whileHover={{ y: -6, rotate: 4 }} whileTap={{ scale: .9 }} className="grid size-14 place-items-center rounded-2xl border border-primary/20 bg-primary text-primary-foreground shadow-lg"><Sparkles className="size-5" /></motion.div></div><div><h2 className="font-semibold">{item.title}</h2><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p></div></CardContent></Card>)}</div><Card><CardHeader><CardTitle>Spring & settle</CardTitle></CardHeader><CardContent className="space-y-5"><Tabs defaultValue="one"><TabsList><TabsTrigger value="one">First</TabsTrigger><TabsTrigger value="two">Second</TabsTrigger><TabsTrigger value="three">Third</TabsTrigger></TabsList><TabsContent value="one">First panel</TabsContent><TabsContent value="two">Second panel</TabsContent><TabsContent value="three">Third panel</TabsContent></Tabs><Progress aria-label="Motion progress specimen" value={replay % 2 ? 85 : 35} /><p className="font-mono text-xs text-muted-foreground">stiffness 420 · damping 32 · mass 0.8</p></CardContent></Card><p className="text-sm text-muted-foreground">System reduced-motion preferences are honored automatically. Use the toolbar to inspect reduced motion. Decorative movement is limited to the foundations overview.</p></main>
}

const meta = { title: "Foundations/Overview", component: Foundations, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Foundations>
export default meta
type Story = StoryObj<typeof meta>
export const System: Story = {}
export const Motion: Story = { render: () => <MotionReference /> }
