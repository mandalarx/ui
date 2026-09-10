import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Tooltip><UI.TooltipTrigger asChild><Button variant="outline">Hover or focus me</Button></UI.TooltipTrigger><UI.TooltipContent>Useful context, close to its source.</UI.TooltipContent></UI.Tooltip></div>
}

const meta = { title: "Components/Tooltip", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
