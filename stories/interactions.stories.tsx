import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within, waitFor } from "storybook/test"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

function InteractionSpecimen() {
  const [count, setCount] = useState(0)
  const trigger = useRef<HTMLButtonElement>(null)
  return <div className="mx-auto max-w-xl space-y-6">
    <h1 className="text-2xl font-semibold">Motion & interaction contracts</h1>
    <Tabs defaultValue="first"><TabsList aria-label="Specimen panels"><TabsTrigger value="first">First</TabsTrigger><TabsTrigger value="second">Second</TabsTrigger><TabsTrigger value="locked" disabled>Locked</TabsTrigger></TabsList><TabsContent value="first">First panel</TabsContent><TabsContent value="second">Second panel</TabsContent></Tabs>
    <label className="flex items-center gap-3"><Switch />Notifications</label>
    <Button variant="signature">Publish specimen</Button>
    <Dialog><DialogTrigger asChild><Button ref={trigger}>Edit specimen</Button></DialogTrigger><DialogContent><DialogTitle>Edit specimen</DialogTitle><DialogDescription>Escape closes this layer and restores focus.</DialogDescription><DialogClose asChild><Button>Done</Button></DialogClose></DialogContent></Dialog>
    <section><h2 className="mb-3 text-lg font-medium">Disclosure</h2><Accordion type="single" collapsible><AccordionItem value="detail"><AccordionTrigger>Details</AccordionTrigger><AccordionContent>Motion follows state.</AccordionContent></AccordionItem></Accordion></section>
    <Button variant="outline" onClick={() => setCount(count + 1)}>Rerender {count}</Button>
    <Button variant="outline" onClick={() => trigger.current?.focus()}>Focus through ref</Button>
  </div>
}

const meta = { title: "Foundations/Interaction contracts", component: InteractionSpecimen } satisfies Meta<typeof InteractionSpecimen>
export default meta
type Story = StoryObj<typeof meta>

export const KeyboardAndFocus: Story = { play: async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  await step("Tabs follow arrow keys and skip disabled items", async () => {
    await userEvent.click(canvas.getByRole("tab", { name: "First" }))
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("tab", { name: "Second" })).toHaveAttribute("data-state", "active")
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("tab", { name: "First" })).toHaveFocus()
  })
  await step("Switch supports Space", async () => {
    canvas.getByRole("switch").focus()
    await userEvent.keyboard(" ")
    await expect(canvas.getByRole("switch")).toBeChecked()
  })
  await step("Modal traps focus, closes on Escape and restores asChild trigger", async () => {
    const trigger = canvas.getByRole("button", { name: "Edit specimen" })
    await userEvent.click(trigger)
    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole("dialog")
    await userEvent.tab(); await userEvent.tab(); await userEvent.tab()
    await expect(dialog.contains(document.activeElement)).toBe(true)
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
    await userEvent.click(canvas.getByRole("button", { name: "Focus through ref" }))
    await expect(trigger).toHaveFocus()
  })
} }

export const InterruptedMotion: Story = { play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const details = canvas.getByRole("button", { name: "Details" })
  await userEvent.click(details); await userEvent.click(details); await userEvent.click(details)
  await expect(details).toHaveAttribute("aria-expanded", "true")
  await expect(canvas.getByText("Motion follows state.")).toBeVisible()
  const second = canvas.getByRole("tab", { name: "Second" })
  await userEvent.click(second)
  const list = canvas.getByRole("tablist")
  await waitFor(() => expect(list.style.getPropertyValue("--indicator-right")).not.toBe(""))
  const panel = canvas.getByRole("tabpanel")
  await waitFor(() => expect(panel.getAnimations().filter(animation => animation.playState === "running")).toHaveLength(0))
  await userEvent.click(canvas.getByRole("button", { name: "Rerender 0" }))
  await expect(canvas.getByRole("tabpanel")).toBe(panel)
  await expect(panel.getAnimations().filter(animation => animation.playState === "running")).toHaveLength(0)
  await expect(second).toHaveAttribute("data-state", "active")
} }

export const ReducedMotion: Story = { globals: { motion: "reduced" }, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Edit specimen" })
  await waitFor(() => expect(parseFloat(getComputedStyle(button).transitionDuration)).toBeLessThan(.001))
  // Under reduced motion the signature ring holds still but keeps its texture.
  const signature = canvas.getByRole("button", { name: "Publish specimen" })
  const ring = getComputedStyle(signature, "::before")
  await expect(ring.display).not.toBe("none")
  await expect(ring.backgroundImage).toContain("linear-gradient")
  await expect(ring.animationName).toBe("none")
  await userEvent.click(button)
  const dialog = await within(document.body).findByRole("dialog")
  await expect(parseFloat(getComputedStyle(dialog).animationDuration)).toBeLessThan(.001)
  await userEvent.keyboard("{Escape}")
} }

export const DarkTheme: Story = { globals: { theme: "dark" }, play: async () => {
  await waitFor(() => expect(document.documentElement).toHaveClass("dark"))
  await expect(localStorage.getItem("atelier-theme")).toBe("dark")
} }
export const LightTheme: Story = { globals: { theme: "light" }, play: async () => {
  await waitFor(() => expect(document.documentElement).not.toHaveClass("dark"))
  await expect(localStorage.getItem("atelier-theme")).toBe("light")
} }
