import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/skeleton"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><div role="status" aria-label="Loading collection" className="space-y-4"><UI.Skeleton className="h-32 w-full rounded-2xl" /><UI.Skeleton className="h-5 w-2/3" /><UI.Skeleton className="h-4 w-full" /><UI.Skeleton className="h-4 w-4/5" /><span className="sr-only">Loading collection</span></div></div>
}

const meta = { title: "Components/Skeleton", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
