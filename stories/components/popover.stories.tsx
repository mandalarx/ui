import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Popover><UI.PopoverTrigger asChild><Button variant="outline">Quick settings</Button></UI.PopoverTrigger><UI.PopoverContent><UI.PopoverHeader><UI.PopoverTitle>Collection</UI.PopoverTitle><UI.PopoverDescription>Adjust the name without leaving your view.</UI.PopoverDescription></UI.PopoverHeader><label className="mt-4 block space-y-2 text-sm">Name<Input defaultValue="Azure Glass" /></label></UI.PopoverContent></UI.Popover></div>
}

const meta = { title: "Components/Popover", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
