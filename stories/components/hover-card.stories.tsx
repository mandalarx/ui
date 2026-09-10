import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.HoverCard><UI.HoverCardTrigger asChild><Button variant="link">About the designer</Button></UI.HoverCardTrigger><UI.HoverCardContent><p className="font-semibold">Mandalar design team</p><p className="mt-2 text-sm text-muted-foreground">Crafting a coherent language for everyday interfaces.</p></UI.HoverCardContent></UI.HoverCard></div>
}

const meta = { title: "Components/Hover Card", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
