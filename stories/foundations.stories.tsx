import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor } from "storybook/test"
import { motion } from "motion/react"
import { useId, useState, type ComponentProps, type ReactNode } from "react"
import { Check, Layers, RotateCcw, Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
import { Reveal } from "@/components/effects/reveal"

const palette = [
  { name: "Azure", value: "#0069e8", role: "Actions, focus, and selection" },
  { name: "Ice", value: "#f3f8ff", role: "Light ground" },
  { name: "Midnight", value: "#07111f", role: "Dark ground" },
  { name: "Deep water", value: "#0d1d30", role: "Dark surfaces" },
]
const lights = [
  { name: "Glacier", value: "#57def3", role: "Caustics and the signature ring" },
  { name: "Sunlit", value: "#fff3d6", role: "Warmth in the brightest light" },
]
const radii = [["Structure", 0], ["Small", 4], ["Items", 6], ["Controls", 8], ["Dialogs", 12]] as const
const commands = [["pnpm", "pnpm storybook"], ["npm", "npm run storybook"], ["yarn", "yarn storybook"]] as const
// Links leave the preview frame for the matching page in the Storybook manager.
const story = (path: string) => `./?path=${path}`
const footer = [
  { title: "Library", links: [["Components", "/docs/components-button--documentation"], ["Blocks", "/story/blocks-full-pages--dashboard-01"], ["Header", "/story/components-header--default"]] },
  { title: "Foundations", links: [["Motion", "/story/foundations-overview--motion"], ["Surfaces", "/story/foundations-overview--surfaces"], ["Effects", "/story/foundations-effects--caustics-surface"]] },
  { title: "Contracts", links: [["Keyboard and focus", "/story/foundations-interaction-contracts--keyboard-and-focus"], ["Reduced motion", "/story/foundations-interaction-contracts--reduced-motion"]] },
] as const

function Foundations() {
  const introId = useId()
  return <div className="azure-frame">
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-12">
      <span className="flex items-center gap-3 font-heading text-lg font-semibold tracking-[-0.03em]"><span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"><Layers className="size-4" aria-hidden="true" /></span>MandalarX UI</span>
      <span className="font-mono text-xs text-muted-foreground">61 components, 97 blocks</span>
    </div>
    <main>
      <Hero />
      <section className="azure-band" aria-labelledby={introId}>
        <div className="azure-section-intro">
          <h2 id={introId} className="text-section">One language for every screen.</h2>
          <p className="text-lg leading-7 text-muted-foreground">Primitives, blocks, and motion share the same lines, the same three typefaces, and the same light.</p>
        </div>
      </section>
      <section className="azure-band" aria-label="Foundations">
        <div className="azure-cells md:grid-cols-2">
          <FeatureCell data-testid="surface-cell" title="Lines, not layers." description="Surfaces are opaque and ruled. Only menus and dialogs cast a shadow, because only they float.">
            <div className="space-y-8"><SurfaceSample /><RadiusLegend /></div>
          </FeatureCell>
          <FeatureCell title="Motion answers people." description="Surfaces settle on a spring and come to rest. Everything leaves faster than it arrived."><CurveSample /></FeatureCell>
          <FeatureCell title="Three voices." description="Geist for headings and navigation, Inter for reading and controls, Geist Mono for code and numbers."><TypeSample /></FeatureCell>
          <FeatureCell title="Azure for action." description="Grounds stay cool and quiet. Glacier and Sunlit appear only as light, never as fills or text."><Palette /></FeatureCell>
        </div>
      </section>
      <CallToAction />
    </main>
    <Footer />
  </div>
}

function Hero() {
  const [completion, setCompletion] = useState([68])
  return <section className="azure-band">
    <div className="azure-cells lg:grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col justify-center gap-10 px-6 py-16 sm:px-12 lg:py-24">
        <Reveal className="space-y-6">
          <h1 className="text-display">Light.<br />In motion.</h1>
          <p className="max-w-md text-lg leading-7 text-muted-foreground">Flat surfaces, fine rules, and one field of moving light. Every shadcn primitive and block, drawn in one azure language.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="signature" asChild><a href={story("/docs/components-button--documentation")} target="_top">Browse components</a></Button>
            <Button variant="outline" asChild><a href={story("/story/foundations-effects--caustics-surface")} target="_top">See the effects</a></Button>
          </div>
        </Reveal>
        <InstallWindow />
      </div>
      {/* The brand panel: the view's one field of moving light, with a live specimen on it. */}
      <div className="relative isolate grid min-h-[28rem] place-items-center overflow-hidden px-6 py-12 sm:px-12">
        <Caustics intensity={.55} />
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="space-y-1.5"><CardTitle className="text-xl">Make it yours.</CardTitle><CardDescription>Every control here is a library primitive.</CardDescription></div>
            <Sparkles className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between"><label htmlFor="specimen-switch" className="text-sm font-medium">State feedback</label><Switch id="specimen-switch" defaultChecked /></div>
            <div>
              <div className="mb-3 flex items-baseline justify-between text-sm"><span className="text-muted-foreground">Completion</span><NumberRoll value={completion[0] / 100} locales="en-US" format={{ style: "percent" }} className="font-mono" /></div>
              <Slider aria-label="Completion" value={completion} onValueChange={setCompletion} />
            </div>
            <div className="flex gap-3 border-t pt-5"><Button className="flex-1" onClick={() => setCompletion([100])}><Check />Complete</Button><Button variant="outline" aria-label="Reset completion" onClick={() => setCompletion([0])}><RotateCcw /></Button></div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
}

function InstallWindow() {
  return <Tabs defaultValue="pnpm" className="w-full max-w-md gap-0 overflow-hidden rounded-lg border bg-card">
    <TabsList variant="line" aria-label="Package manager" className="h-10 w-full justify-start rounded-none border-b px-2">
      {commands.map(([id]) => <TabsTrigger key={id} value={id} className="flex-none px-3 font-mono text-xs">{id}</TabsTrigger>)}
    </TabsList>
    {commands.map(([id, command]) => <TabsContent key={id} value={id} className="px-4 py-3">
      <code className="font-mono text-sm"><span aria-hidden="true" className="text-muted-foreground">$ </span>{command}</code>
    </TabsContent>)}
  </Tabs>
}

function FeatureCell({ title, description, heading: Heading = "h3", children, ...props }: { title: string; description: string; heading?: "h2" | "h3"; children: ReactNode } & ComponentProps<"article">) {
  return <article className="flex flex-col" {...props}>
    <div className="px-6 pt-10 pb-8 sm:px-10">
      <Heading className="text-2xl font-semibold tracking-[-0.02em]">{title}</Heading>
      <p className="mt-3 max-w-md leading-7 text-muted-foreground">{description}</p>
    </div>
    {/* Media runs to the cell's rules and fills the row, so paired cells line up. */}
    <div className="flex flex-1 flex-col justify-center border-t bg-muted/50 px-6 py-8 sm:px-10">{children}</div>
  </article>
}

function SurfaceSample() {
  return <Card data-testid="surface-card" className="gap-5 py-5">
    <CardHeader className="px-5"><CardTitle>Collection</CardTitle><CardDescription>Opaque, ruled, and ready for work.</CardDescription></CardHeader>
    <CardContent className="space-y-4 px-5">
      <label className="block space-y-2 text-sm font-medium">Collection name<Input defaultValue="Azure Blueprint" /></label>
      <div className="flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 text-sm"><Switch defaultChecked />Notify collaborators</label><Button variant="outline" size="sm">Save</Button></div>
    </CardContent>
  </Card>
}

function RadiusLegend() {
  return <ul aria-label="Corner radius by role" className="grid grid-cols-3 gap-4 sm:grid-cols-5">
    {radii.map(([name, radius]) => <li key={name} className="flex items-center gap-3">
      <span aria-hidden="true" className="size-8 shrink-0 border-t-2 border-l-2 border-foreground/40" style={{ borderTopLeftRadius: radius }} />
      <span><span className="block text-sm font-medium">{name}</span><span className="block font-mono text-xs text-muted-foreground">{radius}px</span></span>
    </li>)}
  </ul>
}

function CurveSample() {
  return <div className="grid grid-cols-3 gap-4">
    {curves.filter(curve => ["Enter", "Exit", "Settle"].includes(curve.name)).map(curve => <figure key={curve.token} className="space-y-2">
      <CurvePlot bezier={curve.bezier} points={curve.points} />
      <figcaption><span className="block text-sm font-medium">{curve.name}</span><span className="block font-mono text-xs text-muted-foreground">{curve.token}</span></figcaption>
    </figure>)}
  </div>
}

function TypeSample() {
  return <dl className="space-y-6">
    <div><dt className="font-mono text-xs text-muted-foreground">Geist, headings and navigation</dt><dd className="mt-2 font-heading text-4xl font-medium tracking-[-0.045em]">Clear at every size.</dd></div>
    <div><dt className="font-mono text-xs text-muted-foreground">Inter, reading and controls</dt><dd className="mt-2 max-w-md leading-7">Body copy stays calm and even, from dense tables to long descriptions.</dd></div>
    <div><dt className="font-mono text-xs text-muted-foreground">Geist Mono, code and numbers</dt><dd className="mt-2 font-mono text-sm tabular-nums">--ease-settle: 340ms, 1,287 installs</dd></div>
  </dl>
}

function Swatch({ name, value, role, light = false }: { name: string; value: string; role: string; light?: boolean }) {
  // Light sources are shown as light on Midnight, never as flat fills.
  const background = light ? `radial-gradient(circle at 35% 30%, ${value}, transparent 62%), #07111f` : value
  return <div className="space-y-3">
    <div aria-hidden="true" className="h-16 rounded-md border" style={{ background }} />
    <div><p className="text-sm font-medium">{name}</p><p className="font-mono text-xs text-muted-foreground">{value}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{role}</p></div>
  </div>
}

function Palette() {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
    {palette.map(color => <Swatch key={color.name} {...color} />)}
    {lights.map(color => <Swatch key={color.name} {...color} light />)}
  </div>
}

function CallToAction() {
  const titleId = useId()
  return <section className="azure-band" aria-labelledby={titleId}>
    {/* A second brand panel holds still: only one field of light moves per view. */}
    <div className="relative isolate overflow-hidden">
      <Caustics animated={false} intensity={.5} />
      <div className="azure-section-intro">
        <h2 id={titleId} className="text-section">Start in the workbench.</h2>
        <p className="text-lg leading-7 text-foreground">Every component, block, and effect runs here, in both themes and with reduced motion.</p>
        <Button size="lg" asChild><a href={story("/story/blocks-full-pages--dashboard-01")} target="_top">Open a full-page block</a></Button>
      </div>
    </div>
  </section>
}

function Footer() {
  return <footer className="azure-band">
    <div className="grid gap-10 px-6 py-12 sm:grid-cols-3 sm:px-12">
      {footer.map(column => <nav key={column.title} aria-label={column.title}>
        <h2 className="text-micro text-muted-foreground">{column.title}</h2>
        <ul className="mt-4 space-y-2.5 text-sm">{column.links.map(([label, path]) => <li key={label}><a href={story(path)} target="_top" className="hover:text-primary">{label}</a></li>)}</ul>
      </nav>)}
    </div>
    <div className="flex flex-wrap justify-between gap-4 border-t px-6 py-5 text-micro text-muted-foreground sm:px-12"><span>Azure Blueprint 3.0.0</span><span>Built on shadcn/ui</span></div>
  </footer>
}

function SurfaceStudy() {
  const titleId = useId()
  return <div className="azure-frame">
    <section className="azure-band" aria-labelledby={titleId}>
      <div className="azure-section-intro">
        <h1 id={titleId} className="text-section">Lines, not layers.</h1>
        <p className="text-lg leading-7 text-muted-foreground">Structure comes from rules. Cells sit flush and square, cards stand apart with a hairline and an 8px corner, and only floating layers cast a shadow.</p>
      </div>
    </section>
    <section className="azure-band" aria-label="Surfaces">
      <div className="azure-cells md:grid-cols-2">
        <FeatureCell heading="h2" title="Cells" description="Flush, square, and ruled. Use them for page structure and feature grids.">
          <div className="azure-cells grid-cols-2 border">{["azure-frame", "azure-band", "azure-cells", "azure-section-intro"].map(name => <div key={name} className="px-4 py-6 font-mono text-xs">{name}</div>)}</div>
        </FeatureCell>
        <FeatureCell heading="h2" title="Cards" description="Opaque, with a hairline border and an 8px corner. No shadow."><SurfaceSample /></FeatureCell>
      </div>
    </section>
    <section className="azure-band px-6 py-10 sm:px-12"><RadiusLegend /></section>
  </div>
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
    <div key={replay} className="grid gap-4 sm:grid-cols-3">{durations.map(item => <Card key={item.title}><CardContent className="space-y-6 pt-6"><div className="flex h-24 items-center justify-center rounded-md bg-muted"><motion.div data-testid="motion-sample" initial={reduced ? false : { opacity: 0, y: 18, scale: .8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduced ? 0 : item.duration }} whileHover={reduced ? undefined : { y: -6, rotate: 4 }} whileTap={reduced ? undefined : { scale: .97 }} className="grid size-14 place-items-center rounded-lg bg-primary text-primary-foreground"><Sparkles className="size-5" aria-hidden="true" /></motion.div></div><div><h2 className="font-semibold">{item.title}</h2><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p></div></CardContent></Card>)}</div>
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
    <p className="text-sm text-muted-foreground">System reduced-motion preferences are honored automatically; use the toolbar to inspect reduced motion. Ambient movement appears once per view, on its brand panel. See Foundations / Effects.</p>
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
export const Surfaces: Story = { render: () => <SurfaceStudy /> }
