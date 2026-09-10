import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/spinner"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><div className="flex items-center gap-3"><UI.Spinner /><span className="text-sm">Saving your changes…</span></div></div>
}

const meta = { title: "Components/Spinner", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
