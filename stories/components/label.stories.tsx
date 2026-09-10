import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><div className="space-y-2"><UI.Label htmlFor="label-example">Collection name</UI.Label><Input id="label-example" placeholder="Click the label to focus" /></div></div>
}

const meta = { title: "Components/Label", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
