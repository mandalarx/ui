import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor } from "storybook/test"
import { motion } from "motion/react"
import { useId, useState } from "react"
import { Check, Layers, RotateCcw, Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMotionPreference } from "@/components/motion-provider"
import { Caustics } from "@/components/effects/caustics"
import { NumberRoll } from "@/components/effects/number-roll"
import { usePointerLight } from "@/components/effects/pointer-light"
import { Reveal } from "@/components/effects/reveal"

const palette = [
  { name: "Azure", value: "#0069e8", role: "Actions, focus, and selection" },
  { name: "Ice", value: "#f3f8ff", role: "Light ground" },
  { name: "Midnight", value: "#07111f", role: "Dark ground" },
  { name: "Deep water", value: "#0d1d30", role: "Dark surfaces" },
]
const lights = [
  { name: "Glacier", value: "#57def3", role: "Rims, glints, and caustics" },
  { name: "Sunlit", value: "#fff3d6", role: "Warmth in the brightest light" },
]
const typeScale = [["Display", "48–64px", "300"], ["Heading", "28px", "600"], ["Body", "16px", "400"], ["Interface", "14px", "500"]]
const radii = [["Controls", 12], ["Menus", 16], ["Cards", 20], ["Dialogs", 24]] as const

function Foundations() {
  return <main className="mx-auto max-w-7xl space-y-16 px-5 py-8 sm:px-10 sm:py-12">
    <header className="flex items-center gap-3 border-b pb-6 text-sm font-semibold"><span className="grid size-8 place-items-center rounded-[12px] bg-primary text-primary-foreground"><Layers className="size-4" aria-hidden="true" /></span>MandalarX UI</header>
    <Hero />
    <SurfaceStudy />
    <ColorStudy />
    <TypeStudy />
  </main>
}

function Hero() {
  const light = usePointerLight<HTMLDivElement>()
  const [completion, setCompletion] = useState([68])
  return <section className="relative isolate grid gap-10 overflow-hidden rounded-[28px] border px-6 py-12 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-16">
    {/* Stacked on narrow screens, the text sits above the light instead of beside it. */}
    <Caustics fade="left" intensity={.55} className="max-lg:[mask-image:linear-gradient(to_bottom,transparent_45%,#000_85%)]" />
    <Reveal className="space-y-6">
      <h1 className="text-display">Light.<br />In motion.</h1>
      <p className="max-w-md leading-7 text-foreground">Clear azure, sculpted glass, and light that follows your touch. Every shadcn primitive and block, composed in one visual language.</p>
      <div className="flex flex-wrap gap-2"><Badge variant="secondary">61 components</Badge><Badge variant="secondary">97 blocks</Badge><Badge variant="outline">Light and dark themes</Badge></div>
    </Reveal>
    <Card ref={light} data-surface="glass" data-light="follow" className="border-primary/20">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1.5"><CardTitle className="text-xl">Make it yours.</CardTitle><CardDescription>Move across the card. Every control here is a library primitive.</CardDescription></div>
        <Sparkles className="size-5 shrink-0 text-primary" aria-hidden="true" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="compose"><TabsList className="w-full"><TabsTrigger value="compose">Compose</TabsTrigger><TabsTrigger value="refine">Refine</TabsTrigger><TabsTrigger value="ship">Ship</TabsTrigger></TabsList><TabsContent value="compose" className="pt-5"><p className="text-sm leading-6 text-muted-foreground">Soft depth and precise edges give every interaction a place to land.</p></TabsContent><TabsContent value="refine" className="pt-5"><p className="text-sm leading-6 text-muted-foreground">The indicator stretches toward the tab you choose, then settles. Arrow keys move between tabs.</p></TabsContent><TabsContent value="ship" className="pt-5"><p className="text-sm leading-6 text-muted-foreground">Every block inherits the same tokens, focus treatment, and motion rules.</p></TabsContent></Tabs>
        <div className="flex items-center justify-between"><label htmlFor="specimen-switch" className="text-sm font-medium">State feedback</label><Switch id="specimen-switch" defaultChecked /></div>
        <div>
          <div className="mb-3 flex items-baseline justify-between text-sm"><span className="text-muted-foreground">Completion</span><NumberRoll value={completion[0] / 100} locales="en-US" format={{ style: "percent" }} className="font-mono" /></div>
          <Slider aria-label="Completion" value={completion} onValueChange={setCompletion} />
        </div>
        <div className="flex gap-3 border-t pt-5"><Button className="flex-1" onClick={() => setCompletion([100])}><Check />Complete</Button><Button variant="outline" aria-label="Reset completion" onClick={() => setCompletion([0])}><RotateCcw /></Button></div>
      </CardContent>
    </Card>
  </section>
}

function SurfaceStudy() {
  const titleId = useId()
  return <section className="space-y-6" aria-labelledby={titleId}>
    <div><h2 id={titleId} className="text-2xl font-semibold tracking-tight">Depth, with clarity.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Solid surfaces anchor the work. Glass brings navigation and featured moments into the light, with a rim where light enters and a faint edge where it leaves.</p></div>
    <div className="azure-surface-stage grid gap-6 rounded-[28px] border p-5 sm:p-8 md:grid-cols-2">
      {(["solid", "glass"] as const).map(surface => <Card key={surface} data-surface={surface} data-testid={`surface-${surface}`}>
        <CardHeader><div className="mb-3 flex items-center justify-between"><Badge variant="outline">{surface === "solid" ? "Solid" : "Glass"}</Badge><Layers className="size-4 text-primary" aria-hidden="true" /></div><CardTitle className="text-xl">{surface === "solid" ? "A steady foundation." : "A lighter perspective."}</CardTitle></CardHeader>
        <CardContent className="space-y-5"><p className="text-sm leading-6 text-muted-foreground">{surface === "solid" ? "Opaque and focused. Built for forms, tables, and your everyday work." : "Light passes through. Fine rim highlights reveal the layer beneath."}</p><label className="block space-y-2 text-sm font-medium">{surface === "solid" ? "Solid" : "Glass"} collection<Input defaultValue="Azure Glass" /></label><div className="flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 text-sm"><Switch defaultChecked />{surface === "solid" ? "Solid" : "Glass"} notifications</label><Button variant={surface === "solid" ? "outline" : "default"} disabled>Saved</Button></div></CardContent>
      </Card>)}
    </div>
    <ul aria-label="Corner radius by surface" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {radii.map(([name, radius]) => <li key={name} className="flex items-center gap-3">
        <span aria-hidden="true" className="size-10 border-t-2 border-l-2 border-primary/60" style={{ borderTopLeftRadius: radius }} />
        <span><span className="block text-sm font-medium">{name}</span><span className="block font-mono text-xs text-muted-foreground">{radius}px</span></span>
      </li>)}
    </ul>
  </section>
}

function Swatch({ name, value, role, light = false }: { name: string; value: string; role: string; light?: boolean }) {
  // Light sources are shown as light on Midnight, never as flat fills.
  const background = light ? `radial-gradient(circle at 35% 30%, ${value}, transparent 62%), #07111f` : value
  return <div className="space-y-3">
    <div aria-hidden="true" className="h-24 rounded-[16px] border" style={{ background }} />
    <div><p className="text-sm font-medium">{name}</p><p className="font-mono text-xs text-muted-foreground">{value}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{role}</p></div>
  </div>
}

function ColorStudy() {
  return <section className="space-y-6">
    <div><h2 className="text-2xl font-semibold tracking-tight">Color</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Azure is for action. Grounds stay cool and quiet. Glacier and Sunlit are light sources: they appear only as light, never as fills or text.</p></div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
      {palette.map(color => <Swatch key={color.name} {...color} />)}
      {lights.map(color => <Swatch key={color.name} {...color} light />)}
    </div>
  </section>
}

function TypeStudy() {
  return <section className="grid gap-10 rounded-[20px] border bg-card p-6 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold tracking-tight">Type</h2>
      <p className="text-display">Clear at every size.</p>
      <p className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">Headings carry the structure.</p>
      <p className="max-w-prose leading-7 text-muted-foreground">Manrope carries the interface, from light display lines to dense controls. IBM Plex Mono is kept for numbers and code, with tabular figures that line up.</p>
    </div>
    <dl className="grid content-end gap-4">
      {typeScale.map(([role, size, weight]) => <div key={role} className="flex items-baseline justify-between gap-4 border-b pb-3"><dt className="text-sm font-medium">{role}</dt><dd className="font-mono text-sm text-muted-foreground">{size}, weight {weight}</dd></div>)}
    </dl>
  </section>
}

// --ease-settle from app/globals.css: atelierSpring sampled at 35 points.
const settle = [0, .023, .081, .159, .248, .339, .43, .514, .592, .662, .723, .776, .821, .859, .891, .917, .938, .954, .967, .978, .985, .991, .996, .999, 1.001, 1.002, 1.003, 1.003, 1.004, 1.004, 1.003, 1.003, 1.003, 1.002, 1]
const curves = [
  { name: "Standard", token: "--ease-standard", use: "Color, opacity, and borders", bezier: [.2, .8, .2, 1] },
  { name: "Enter", token: "--ease-enter", use: "Things arriving", bezier: [.16, 1, .3, 1] },
  { name: "Exit", token: "--ease-exit", use: "Things leaving", bezier: [.4, 0, 1, 1] },
  { name: "Pop", token: "--ease-spring", use: "Thumbs, checks, and presses", bezier: [.22, 1.18, .36, 1] },
  { name: "Settle", token: "--ease-settle", use: "Surfaces and indicators", points: settle },
]
const durations = [
  { title: "Touch", detail: "120ms, immediate feedback", duration: .12 },
  { title: "Travel", detail: "200ms, state transitions", duration: .2 },
  { title: "Arrive", detail: "340ms, layered surfaces", duration: .34 },
]

function CurvePlot({ bezier, points }: { bezier?: number[]; points?: number[] }) {
  const x = (t: number) => 8 + t * 104
  const y = (v: number) => 66 - v * 48
  const d = bezier
    ? `M${x(0)},${y(0)} C${x(bezier[0])},${y(bezier[1])} ${x(bezier[2])},${y(bezier[3])} ${x(1)},${y(1)}`
    : `M${(points ?? []).map((v, i, all) => `${x(i / (all.length - 1))},${y(v)}`).join(" L")}`
  return <svg viewBox="0 0 120 76" className="h-20 w-full" aria-hidden="true">
    <line x1={x(0)} x2={x(1)} y1={y(0)} y2={y(0)} className="stroke-border" />
    <line x1={x(0)} x2={x(1)} y1={y(1)} y2={y(1)} className="stroke-border" strokeDasharray="2 3" />
    <path d={d} fill="none" className="stroke-primary" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

function MotionReference() {
  const reduced = useMotionPreference()
  const [replay, setReplay] = useState(0)
  const [progress, setProgress] = useState(35)
  return <main className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-4xl font-semibold tracking-tight">Responsive by nature.</h1><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">Controls answer immediately. Surfaces settle. Everything leaves faster than it arrived. Entrances replay here only when you ask.</p></div>
      <Button variant="outline" onClick={() => setReplay(replay + 1)}><RotateCcw />Replay</Button>
    </header>
    <div key={replay} className="grid gap-4 sm:grid-cols-3">{durations.map(item => <Card key={item.title}><CardContent className="space-y-6 pt-6"><div className="flex h-24 items-center justify-center rounded-xl bg-muted"><motion.div data-testid="motion-sample" initial={reduced ? false : { opacity: 0, y: 18, scale: .8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduced ? 0 : item.duration }} whileHover={reduced ? undefined : { y: -6, rotate: 4 }} whileTap={reduced ? undefined : { scale: .97 }} className="grid size-14 place-items-center rounded-2xl border border-primary/20 bg-primary text-primary-foreground shadow-lg"><Sparkles className="size-5" aria-hidden="true" /></motion.div></div><div><h2 className="font-semibold">{item.title}</h2><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p></div></CardContent></Card>)}</div>
    <Card>
      <CardHeader><CardTitle>Curves</CardTitle><CardDescription>Surfaces move on springs and come to rest. Light moves at a constant speed and never bounces.</CardDescription></CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">{curves.map(curve => <figure key={curve.token} className="space-y-2"><CurvePlot bezier={curve.bezier} points={curve.points} /><figcaption><span className="block text-sm font-medium">{curve.name}</span><span className="block font-mono text-xs text-muted-foreground">{curve.token}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{curve.use}</span></figcaption></figure>)}</CardContent>
    </Card>
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Enter and exit</CardTitle><CardDescription>Layers arrive from their trigger on the settle spring in 340ms, then leave in 160ms, accelerating away.</CardDescription></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Popover><PopoverTrigger asChild><Button variant="outline">Open a popover</Button></PopoverTrigger><PopoverContent><p className="text-sm font-medium">Scaled from its trigger</p><p className="mt-1 text-sm text-muted-foreground">Press Escape or click outside to watch it leave.</p></PopoverContent></Popover>
          <Dialog><DialogTrigger asChild><Button>Open a dialog</Button></DialogTrigger><DialogContent><DialogTitle>Rises, then settles</DialogTitle><DialogDescription>Dialogs rise 8px and settle on the spring. Closing is a quick fade.</DialogDescription><DialogClose asChild><Button className="justify-self-end">Close</Button></DialogClose></DialogContent></Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Press, draw, stretch</CardTitle><CardDescription>Small controls use the pop spring. A switch thumb stretches while pressed, and a check draws itself.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center justify-between gap-3 text-sm font-medium">Notifications<Switch defaultChecked /></label>
          <label className="flex items-center gap-3 text-sm font-medium"><Checkbox />Email me a weekly summary</label>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader><CardTitle>Spring and settle</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="one"><TabsList><TabsTrigger value="one">First</TabsTrigger><TabsTrigger value="two">Second</TabsTrigger><TabsTrigger value="three">Third</TabsTrigger></TabsList><TabsContent value="one">First panel</TabsContent><TabsContent value="two">Second panel</TabsContent><TabsContent value="three">Third panel</TabsContent></Tabs>
        <Accordion type="single" collapsible><AccordionItem value="close"><AccordionTrigger>What happens when a panel closes?</AccordionTrigger><AccordionContent>Its height collapses on an accelerating curve in 240ms, a little faster than it opened.</AccordionContent></AccordionItem></Accordion>
        <div className="space-y-3">
          <Progress aria-label="Upload progress" value={progress} />
          <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" onClick={() => setProgress(current => Math.min(100, current + 25))}>Advance</Button><Button variant="outline" size="sm" onClick={() => setProgress(100)}>Finish</Button><Button variant="ghost" size="sm" onClick={() => setProgress(35)}>Reset</Button></div>
        </div>
        <p className="font-mono text-xs text-muted-foreground">stiffness 420, damping 32, mass 0.8. Settles in about 330ms.</p>
      </CardContent>
    </Card>
    <p className="text-sm text-muted-foreground">System reduced-motion preferences are honored automatically; use the toolbar to inspect reduced motion. Ambient movement appears once per view, on its signature surface. See Foundations / Effects.</p>
  </main>
}

const meta = { title: "Foundations/Overview", component: Foundations, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Foundations>
export default meta
type Story = StoryObj<typeof meta>
export const System: Story = {
  play: async ({ canvasElement }) => {
    // Let the headline finish its entrance before accessibility checks read its contrast.
    const reveal = canvasElement.querySelector<HTMLElement>('[data-slot="reveal"]')!
    await waitFor(() => expect(reveal.dataset.revealState).not.toBe("pending"))
    await waitFor(() => expect(reveal.getAnimations({ subtree: true }).filter(animation => animation.playState === "running")).toHaveLength(0), { timeout: 3000 })
  },
}
export const Motion: Story = { render: () => <MotionReference /> }
export const Surfaces: Story = { render: () => <main className="mx-auto max-w-6xl p-6 sm:p-10"><SurfaceStudy /></main> }
