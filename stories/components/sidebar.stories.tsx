import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Composition from "@/blocks/sidebar-01/page"

function Example() {
  
  return <div className="w-full"><Composition /></div>
}

const meta = { title: "Components/Sidebar", component: Example, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
