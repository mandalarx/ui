import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Collapsible><UI.CollapsibleTrigger asChild><Button variant="outline">Toggle technical details</Button></UI.CollapsibleTrigger><UI.CollapsibleContent className="mt-4 rounded-xl border p-4 text-sm">61 primitives share the same semantic tokens.</UI.CollapsibleContent></UI.Collapsible></div>
}

const meta = { title: "Components/Collapsible", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
