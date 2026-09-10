import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/aspect-ratio"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.AspectRatio ratio={16 / 9} className="grid place-items-center rounded-2xl border bg-accent"><span className="font-mono text-accent-foreground">16 : 9 / Media canvas</span></UI.AspectRatio></div>
}

const meta = { title: "Components/Aspect Ratio", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
