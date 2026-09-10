import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/textarea"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><label className="space-y-2 text-sm">Design notes<UI.Textarea placeholder="Describe the intended behavior…" /></label><UI.Textarea aria-label="Invalid notes" aria-invalid defaultValue="Too short" /><UI.Textarea aria-label="Disabled notes" disabled placeholder="Editing is disabled" /></></div>
}

const meta = { title: "Components/Textarea", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
