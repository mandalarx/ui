import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/input"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><label className="space-y-2 text-sm">Collection name<UI.Input placeholder="Azure Blueprint" /></label><label className="space-y-2 text-sm">Invalid slug<UI.Input aria-invalid aria-describedby="input-error" defaultValue="azure azure" /></label><p id="input-error" className="text-sm text-destructive">Use hyphens instead of spaces.</p><UI.Input aria-label="Disabled input" disabled placeholder="Read only workspace" /></></div>
}

const meta = { title: "Components/Input", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
