import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/calendar"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Calendar mode="single" defaultMonth={new Date(2026, 8, 1)} className="w-fit rounded-2xl border bg-card" /></div>
}

const meta = { title: "Components/Calendar", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
