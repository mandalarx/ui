import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/message-scroller"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.MessageScrollerProvider><UI.MessageScroller className="h-72 rounded-xl border"><UI.MessageScrollerViewport><UI.MessageScrollerContent className="space-y-4 p-4">{Array.from({ length: 15 }, (_, n) => <UI.MessageScrollerItem key={n}><p className="rounded-xl bg-muted p-3 text-sm">Design update {n + 1}: the collection is taking shape.</p></UI.MessageScrollerItem>)}</UI.MessageScrollerContent></UI.MessageScrollerViewport><UI.MessageScrollerButton /></UI.MessageScroller></UI.MessageScrollerProvider></div>
}

const meta = { title: "Components/Message Scroller", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
