import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/slider"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><UI.Slider defaultValue={[35]} aria-label="Intensity" /><UI.Slider defaultValue={[20, 80]} aria-label="Range" /><UI.Slider defaultValue={[50]} disabled aria-label="Locked intensity" /></></div>
}

const meta = { title: "Components/Slider", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
