import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/item"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Item variant="outline"><UI.ItemContent><UI.ItemTitle>Azure tokens</UI.ItemTitle><UI.ItemDescription>Colors, radii, typography, and motion.</UI.ItemDescription></UI.ItemContent><UI.ItemActions><Button variant="outline" size="sm">Inspect</Button></UI.ItemActions></UI.Item></div>
}

const meta = { title: "Components/Item", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
