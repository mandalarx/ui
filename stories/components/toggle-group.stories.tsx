import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/toggle-group"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.ToggleGroup type="single" defaultValue="center" aria-label="Alignment" variant="outline"><UI.ToggleGroupItem value="left">Left</UI.ToggleGroupItem><UI.ToggleGroupItem value="center">Center</UI.ToggleGroupItem><UI.ToggleGroupItem value="right">Right</UI.ToggleGroupItem></UI.ToggleGroup></div>
}

const meta = { title: "Components/Toggle Group", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
