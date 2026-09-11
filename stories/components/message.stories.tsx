import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/message"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.MessageGroup><UI.Message><UI.MessageContent><UI.MessageHeader>Design team · 10:24</UI.MessageHeader><p className="rounded-xl bg-muted p-3 text-sm">The updated azure scale is ready to review.</p><UI.MessageFooter>Delivered</UI.MessageFooter></UI.MessageContent></UI.Message><UI.Message align="end"><UI.MessageContent><p className="rounded-xl bg-primary p-3 text-sm text-primary-foreground">Looks good in both themes.</p></UI.MessageContent></UI.Message></UI.MessageGroup></div>
}

const meta = { title: "Components/Message", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
