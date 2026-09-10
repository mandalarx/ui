import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/toggle"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><div className="flex gap-3"><UI.Toggle aria-label="Bold" className="font-bold">B</UI.Toggle><UI.Toggle aria-label="Italic" variant="outline" className="italic">I</UI.Toggle><UI.Toggle aria-label="Unavailable formatting" disabled>U</UI.Toggle></div></div>
}

const meta = { title: "Components/Toggle", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
