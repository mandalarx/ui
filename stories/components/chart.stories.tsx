import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChartAreaInteractive as Composition } from "@/blocks/chart-area-interactive/index"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><Composition /></div>
}

const meta = { title: "Components/Chart", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
