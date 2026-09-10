import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/bubble"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.BubbleGroup>{(["default", "secondary", "tinted", "outline", "destructive"] as const).map(variant => <UI.Bubble key={variant} variant={variant}><UI.BubbleContent>{variant} · A thought, beautifully contained.</UI.BubbleContent></UI.Bubble>)}</UI.BubbleGroup></div>
}

const meta = { title: "Components/Bubble", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
