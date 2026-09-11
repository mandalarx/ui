import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within, waitFor } from "storybook/test"
import { createContext, useContext, useState, type ComponentPropsWithRef } from "react"
import { Layers, Palette, Zap } from "lucide-react"
import { Header, type HeaderNavItem } from "@/components/header"

const items: HeaderNavItem[] = [
  { id: "product", label: "Product", children: [
    { id: "overview", label: "Overview", href: "#overview", description: "Everything you need to build your next idea.", icon: <Layers /> },
    { id: "design", label: "Design system", href: "#design", description: "A shared language for every screen.", icon: <Palette /> },
    { id: "motion", label: "Motion", href: "#motion", description: "Small details that make the difference.", icon: <Zap /> },
  ] },
  { id: "resources", label: "Resources", href: "#resources" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
]
const meta = {
  title: "Components/Header", component: Header, tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    brand: <><span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Layers className="size-5" /></span>Mandalar</>,
    brandHref: "#overview", brandLabel: "Mandalar home", items, activeHref: "#design",
    actions: [{ id: "login", label: "Sign in", href: "#signin", variant: "secondary" }, { id: "start", label: "Get started", href: "#start" }],
  },
  decorators: [(Story) => <div className="flow-root"><Story /><main className="mx-auto max-w-5xl px-6 pb-24">
    <section id="overview" className="azure-hero relative my-12 overflow-hidden rounded-3xl border px-8 py-20 sm:px-16"><p className="relative z-10 mb-5 text-sm text-primary">MANDALAR STUDIO</p><h1 className="relative z-10 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">Make room for your next idea.</h1><p className="relative z-10 mt-6 max-w-md text-lg text-muted-foreground">A shared space for thoughtful design, useful tools, and things worth building.</p></section>
    {["design", "motion", "resources", "pricing", "signin", "start"].map(id => <section key={id} id={id} className="min-h-64 scroll-mt-32 border-t py-12"><h2 className="text-2xl font-semibold capitalize">{id === "signin" ? "Sign in" : id === "start" ? "Get started" : id}</h2><p className="mt-4 text-muted-foreground">Example destination for the header navigation.</p></section>)}
  </main></div>],
} satisfies Meta<typeof Header>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Minimal: Story = { args: { items: [{ id: "about", label: "About", href: "#overview" }], actions: [], sticky: false } }
export const CustomBrand: Story = { args: { brand: <span className="font-mono tracking-widest">NORTH / 01</span>, brandLabel: "North home" } }
export const LongLabels: Story = { args: { items: [
  { id: "platform", label: "Explore the complete platform", children: [{ id: "team", label: "Tools for distributed creative teams", href: "#design", description: "Bring your entire organization together in one shared workspace." }] },
  { id: "resources", label: "Resources and documentation", href: "#resources" },
], actions: [{ id: "start", label: "Start building together", href: "#start" }] } }

// A router can intercept navigation while preserving all primitive attributes and refs.
const RouteContext = createContext<(href: string) => void>(() => {})
function DemoLink({ onClick, ...props }: ComponentPropsWithRef<"a">) {
  const navigate = useContext(RouteContext)
  return <a {...props} onClick={event => { onClick?.(event); if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && (!props.target || props.target === "_self")) { event.preventDefault(); navigate(props.href ?? "#overview") } }} />
}
export const RouterAdapter: Story = { render: function RouterExample(args) {
  const [route, setRoute] = useState("#design")
  return <RouteContext.Provider value={setRoute}><Header {...args} linkComponent={DemoLink} activeHref={route} /><p role="status" className="px-8">Current route: {route}</p></RouteContext.Provider>
}, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  if (window.innerWidth < 1024) return
  await userEvent.click(canvas.getByRole("link", { name: "Resources" }))
  await expect(canvas.getByRole("status")).toHaveTextContent("#resources")
  await expect(canvas.getByRole("link", { name: "Resources" })).toHaveAttribute("aria-current", "page")
} }
export const KeyboardNavigation: Story = { play: async ({ canvasElement }) => {
  if (window.innerWidth < 1024) return
  const canvas = within(canvasElement)
  const trigger = canvas.getByRole("button", { name: "Product" })
  trigger.focus()
  await userEvent.keyboard("{Enter}")
  const link = await canvas.findByRole("link", { name: /Design system/ })
  await expect(link).toHaveAttribute("aria-current", "page")
  await userEvent.keyboard("{ArrowDown}")
  await waitFor(() => expect(canvas.getByRole("link", { name: /Overview Everything/ })).toHaveFocus())
  await userEvent.keyboard("{Escape}")
  await expect(trigger).toHaveFocus()
} }
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } }, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const trigger = canvas.getByRole("button", { name: "Open navigation" })
  await userEvent.click(trigger)
  const body = within(canvasElement.ownerDocument.body)
  const dialog = await body.findByRole("dialog", { name: "Navigation" })
  await userEvent.click(within(dialog).getByRole("button", { name: "Product" }))
  await expect(within(dialog).getByRole("link", { name: /Design system/ })).toHaveAttribute("aria-current", "page")
  await userEvent.tab()
  await expect(dialog.contains(document.activeElement)).toBe(true)
  await userEvent.keyboard("{Escape}")
  await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument())
  await expect(trigger).toHaveFocus()
} }
