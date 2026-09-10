import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/radio-group"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.RadioGroup defaultValue="balanced" aria-label="Density">{["Compact", "Balanced", "Spacious"].map(label => <label key={label} className="flex items-center gap-3"><UI.RadioGroupItem value={label.toLowerCase()} />{label}</label>)}</UI.RadioGroup></div>
}

const meta = { title: "Components/Radio Group", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
