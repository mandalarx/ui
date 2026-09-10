import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/attachment"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><>{(["idle", "uploading", "error", "done"] as const).map(state => <UI.Attachment key={state} state={state}><UI.AttachmentContent><UI.AttachmentTitle>Atelier-tokens.json</UI.AttachmentTitle><UI.AttachmentDescription>{state}</UI.AttachmentDescription></UI.AttachmentContent></UI.Attachment>)}</></div>
}

const meta = { title: "Components/Attachment", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
