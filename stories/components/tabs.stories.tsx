import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/tabs"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Tabs defaultValue="design"><UI.TabsList><UI.TabsTrigger value="design">Design</UI.TabsTrigger><UI.TabsTrigger value="motion">Motion</UI.TabsTrigger><UI.TabsTrigger value="disabled" disabled>Locked</UI.TabsTrigger></UI.TabsList><UI.TabsContent value="design" className="rounded-xl border p-5">Graphite, violet, and fine illuminated edges.</UI.TabsContent><UI.TabsContent value="motion" className="rounded-xl border p-5">The indicator follows selection, including keyboard navigation.</UI.TabsContent></UI.Tabs></div>
}

const meta = { title: "Components/Tabs", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
