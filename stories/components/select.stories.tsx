import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/select"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Select defaultValue="violet"><UI.SelectTrigger aria-label="Accent color" className="w-full"><UI.SelectValue placeholder="Choose an accent" /></UI.SelectTrigger><UI.SelectContent><UI.SelectItem value="violet">Violet</UI.SelectItem><UI.SelectItem value="teal">Teal</UI.SelectItem><UI.SelectItem value="amber">Amber</UI.SelectItem><UI.SelectItem value="locked" disabled>Custom (locked)</UI.SelectItem></UI.SelectContent></UI.Select></div>
}

const meta = { title: "Components/Select", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
