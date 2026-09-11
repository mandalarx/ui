import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/separator"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><div><h2 className="font-semibold">Azure Blueprint</h2><p className="mt-2 text-sm text-muted-foreground">A coherent system for expressive interfaces.</p></div><UI.Separator /><div className="flex h-5 items-center gap-4 text-sm"><span>Color</span><UI.Separator orientation="vertical" /><span>Type</span><UI.Separator orientation="vertical" /><span>Motion</span></div></></div>
}

const meta = { title: "Components/Separator", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
