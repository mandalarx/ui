import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/input-group"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.InputGroup><UI.InputGroupAddon>https://</UI.InputGroupAddon><UI.InputGroupInput aria-label="Site address" placeholder="azure.design" /><UI.InputGroupAddon align="inline-end"><UI.InputGroupText>.design</UI.InputGroupText></UI.InputGroupAddon></UI.InputGroup></div>
}

const meta = { title: "Components/Input Group", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
