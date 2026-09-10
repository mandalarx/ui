"use client"

import { motion } from "motion/react"
import { ArrowRight, Check, Moon, Sparkles, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const swatches = [["Graphite", "bg-foreground"], ["Violet", "bg-primary"], ["Teal", "bg-chart-2"], ["Amber", "bg-chart-3"], ["Magenta", "bg-chart-4"]]

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme()
  const dark = resolvedTheme === "dark"
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-6 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_4%,color-mix(in_oklab,var(--primary)_17%,transparent),transparent_30%),radial-gradient(circle_at_8%_82%,color-mix(in_oklab,var(--chart-2)_10%,transparent),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b pb-5">
          <div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_28px_color-mix(in_oklab,var(--primary)_32%,transparent)]"><Sparkles className="size-4" /></div><div><p className="font-semibold tracking-[-0.02em]">Mandalar UI</p><p className="font-mono text-xs text-muted-foreground">shadcn workbench</p></div></div>
          <Button variant="outline" size="icon" aria-label={`Use ${dark ? "light" : "dark"} theme`} onClick={() => setTheme(dark ? "light" : "dark")}>{dark ? <Sun /> : <Moon />}</Button>
        </header>
        <section className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 170, damping: 20 }}>
            <Badge variant="secondary" className="mb-5 gap-1.5 py-1"><span className="size-1.5 rounded-full bg-primary" /> Registry complete</Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">A composed system for serious product work.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Every shadcn component, one graphite-and-violet language, and clear rules for typography, motion, states, and accessibility.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button className="group">Open Storybook <ArrowRight className="transition-transform group-hover:translate-x-0.5" /></Button><Button variant="outline">Read foundations</Button></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.45 }}>
            <Card className="border-primary/15 bg-card/85 shadow-[0_24px_80px_color-mix(in_oklab,var(--foreground)_10%,transparent)] backdrop-blur-xl"><CardHeader><div className="flex items-center justify-between"><CardTitle>Component health</CardTitle><Badge variant="outline">v1 foundation</Badge></div><CardDescription>Coverage from the official registry snapshot.</CardDescription></CardHeader><CardContent className="space-y-6"><div><div className="mb-2 flex justify-between text-sm"><span>Components</span><span className="font-mono text-xs">61 / 61</span></div><Progress value={100} /></div><div><div className="mb-2 flex justify-between text-sm"><span>Blocks archived</span><span className="font-mono text-xs">97 / 97</span></div><Progress value={100} /></div><Separator /><div className="flex items-center justify-between"><div><p className="text-sm font-medium">Accessible motion</p><p className="text-xs text-muted-foreground">Reduced-motion safe</p></div><Switch defaultChecked aria-label="Accessible motion enabled" /></div></CardContent></Card>
          </motion.div>
        </section>
        <section className="grid gap-4 pb-12 md:grid-cols-3"><Card className="md:col-span-2"><CardHeader><CardTitle>Signature palette</CardTitle><CardDescription>Semantic color first; raw values stay in the foundation layer.</CardDescription></CardHeader><CardContent className="grid grid-cols-5 gap-3">{swatches.map(([name, color], index) => <motion.div key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.055 }}><div className={`h-20 rounded-lg ${color}`} /><p className="mt-2 text-xs font-medium">{name}</p></motion.div>)}</CardContent></Card><Card><CardHeader><CardTitle>Balanced density</CardTitle><CardDescription>36px controls on a 4px spacing grid.</CardDescription></CardHeader><CardContent className="space-y-3"><Input placeholder="Search components…" /><Button variant="secondary" className="w-full"><Check /> Ready to compose</Button></CardContent></Card></section>
      </div>
    </main>
  )
}
