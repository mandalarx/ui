import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, userEvent, waitFor, within } from "storybook/test"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Minus, Moon, Plus, RotateCcw, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Caustics, type CausticsProps } from "@/components/effects/caustics"
import { usePointerLight } from "@/components/effects/pointer-light"
import { Reveal } from "@/components/effects/reveal"
import { NumberRoll } from "@/components/effects/number-roll"
import { startThemeTransition } from "@/components/effects/theme-transition"

function CausticsSpecimen({ intensity = .6, tint = "cool" }: Pick<CausticsProps, "intensity" | "tint">) {
  return <section className="relative isolate overflow-hidden border px-6 py-16 sm:px-12 sm:py-24">
    <Caustics intensity={intensity} tint={tint} fade="left" />
    <div className="max-w-md">
      <h1 className="text-display">One field of light.</h1>
      <p className="mt-6 leading-7 text-foreground">Sunlight moving through water. Use it once per view, as the brand panel people see first, and keep text on the quiet side.</p>
    </div>
  </section>
}

function PointerLightSpecimen() {
  const light = usePointerLight<HTMLDivElement>()
  return <section className="grid min-h-[28rem] place-items-center border bg-muted/50 p-6 sm:p-10">
    <Card ref={light} data-light="follow" data-testid="lit-card" className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Move across the card</CardTitle>
        <CardDescription>The highlight follows a mouse or pen, and the border brightens nearest it. Tab into the card to send a glint around its border.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Input aria-label="Collection name" defaultValue="Azure Blueprint" />
        <Button>Save</Button>
      </CardContent>
    </Card>
  </section>
}

function RevealSpecimen() {
  const [run, setRun] = useState(0)
  return <section className="space-y-8">
    <Button variant="outline" onClick={() => setRun(run + 1)}><RotateCcw />Replay entrance</Button>
    <Reveal key={run} className="space-y-6">
      <h1 className="text-display">Clear as ice.</h1>
      <p className="max-w-md leading-7 text-muted-foreground">Each line comes out of the frost in turn. The words are on the page from the start, so assistive technology and search read them immediately.</p>
      <div className="flex flex-wrap gap-3"><Button>Browse components</Button><Button variant="outline">Read the design notes</Button></div>
    </Reveal>
  </section>
}

function NumberRollSpecimen() {
  const [value, setValue] = useState(1280)
  return <Card className="max-w-md">
    <CardHeader>
      <CardDescription>Components installed this week</CardDescription>
      <CardTitle className="font-mono text-5xl font-medium tracking-tight"><NumberRoll value={value} locales="en-US" /></CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-2">
      <Button variant="outline" size="icon" aria-label="Decrease by 7" onClick={() => setValue(current => current - 7)}><Minus /></Button>
      <Button variant="outline" size="icon" aria-label="Increase by 7" onClick={() => setValue(current => current + 7)}><Plus /></Button>
      <Button variant="secondary" onClick={() => setValue(current => current + 1000)}>Add a thousand</Button>
    </CardContent>
  </Card>
}

function ThemeTransitionSpecimen() {
  const { resolvedTheme, setTheme } = useTheme()
  const dark = resolvedTheme === "dark"
  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = dark ? "light" : "dark"
    void startThemeTransition(() => new Promise<void>(resolve => {
      // next-themes applies its class after render; wait for it so the new state is captured.
      const root = document.documentElement
      const done = () => { observer.disconnect(); clearTimeout(timeout); resolve() }
      const observer = new MutationObserver(() => { if (root.classList.contains("dark") === (next === "dark")) done() })
      const timeout = setTimeout(done, 500)
      observer.observe(root, { attributes: true, attributeFilter: ["class"] })
      setTheme(next)
    }), event.currentTarget)
  }
  return <Card className="max-w-md">
    <CardHeader>
      <CardTitle className="text-xl">Theme transition</CardTitle>
      <CardDescription>The new theme spreads out from the button like light filling a room.</CardDescription>
    </CardHeader>
    <CardContent><Button onClick={toggle}>{dark ? <Sun /> : <Moon />}{dark ? "Switch to light" : "Switch to dark"}</Button></CardContent>
  </Card>
}

const page = "mx-auto max-w-6xl space-y-10 p-6 sm:p-10"
type EffectArgs = Required<Pick<CausticsProps, "intensity" | "tint">>
const meta = { title: "Foundations/Effects", parameters: { layout: "fullscreen" } } satisfies Meta<EffectArgs>
export default meta
type Story = StoryObj<EffectArgs>

export const CausticsSurface: Story = {
  name: "Caustics",
  args: { intensity: .6, tint: "cool" },
  argTypes: { intensity: { control: { type: "range", min: 0, max: 1, step: .05 } }, tint: { control: "inline-radio", options: ["cool", "sunlit"] } },
  render: args => <main className={page}><CausticsSpecimen intensity={args.intensity} tint={args.tint} /></main>,
  play: async ({ canvasElement }) => {
    const caustics = canvasElement.querySelector<HTMLElement>('[data-slot="caustics"]')!
    await expect(caustics).toHaveAttribute("aria-hidden", "true")
    await expect(getComputedStyle(caustics, "::before").animationName).toBe("azure-caustic-a")
  },
}

export const PointerLight: Story = {
  render: () => <main className={page}><PointerLightSpecimen /></main>,
  play: async ({ canvasElement }) => {
    const card = within(canvasElement).getByTestId("lit-card")
    const box = card.getBoundingClientRect()
    fireEvent.pointerMove(card, { pointerType: "touch", clientX: box.left + 10, clientY: box.top + 10 })
    await expect(card).not.toHaveAttribute("data-lit")
    fireEvent.pointerMove(card, { pointerType: "mouse", clientX: box.left + box.width / 4, clientY: box.top + box.height / 2 })
    await expect(card).toHaveAttribute("data-lit")
    await waitFor(() => expect(card.style.getPropertyValue("--light-x")).toBe("25.0%"))
    fireEvent.pointerLeave(card)
    await expect(card).not.toHaveAttribute("data-lit")
  },
}

export const FrostReveal: Story = {
  render: () => <main className={page}><RevealSpecimen /></main>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { name: "Clear as ice." })).toBeInTheDocument()
    const reveal = canvasElement.querySelector<HTMLElement>('[data-slot="reveal"]')!
    await waitFor(() => expect(reveal).toHaveAttribute("data-reveal-state", "shown"))
    await waitFor(() => expect(reveal.getAnimations({ subtree: true }).filter(animation => animation.playState === "running")).toHaveLength(0), { timeout: 3000 })
  },
}

export const RollingNumbers: Story = {
  render: () => <main className={page}><NumberRollSpecimen /></main>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("1,280")).toHaveClass("sr-only")
    await userEvent.click(canvas.getByRole("button", { name: "Increase by 7" }))
    await expect(canvas.getByText("1,287")).toBeInTheDocument()
  },
}

export const ThemeTransition: Story = {
  render: () => <main className={page}><ThemeTransitionSpecimen /></main>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = document.documentElement
    const before = root.classList.contains("dark")
    await userEvent.click(canvas.getByRole("button", { name: /Switch to/ }))
    await waitFor(() => expect(root.classList.contains("dark")).toBe(!before))
    await userEvent.click(canvas.getByRole("button", { name: /Switch to/ }))
    await waitFor(() => expect(root.classList.contains("dark")).toBe(before))
  },
}

export const ReducedMotion: Story = {
  globals: { motion: "reduced" },
  render: () => <main className={page}><CausticsSpecimen /><RevealSpecimen /></main>,
  play: async ({ canvasElement }) => {
    const caustics = canvasElement.querySelector<HTMLElement>('[data-slot="caustics"]')!
    await waitFor(() => expect(getComputedStyle(caustics, "::before").animationName).toBe("none"))
    const reveal = canvasElement.querySelector<HTMLElement>('[data-slot="reveal"]')!
    await expect(reveal).not.toHaveAttribute("data-reveal-state", "pending")
  },
}
