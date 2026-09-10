import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/progress"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><>{[0, 42, 100].map(value => <div key={value} className="space-y-2"><p className="font-mono text-xs">{value}% complete</p><UI.Progress value={value} aria-label={value + "% complete"} /></div>)}</></div>
}

const meta = { title: "Components/Progress", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
