import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/badge"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><div className="flex flex-wrap gap-3">{(["default", "secondary", "outline", "destructive"] as const).map(variant => <UI.Badge key={variant} variant={variant}>{variant}</UI.Badge>)}</div></div>
}

const meta = { title: "Components/Badge", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
