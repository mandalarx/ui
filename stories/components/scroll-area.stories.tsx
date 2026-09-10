import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/scroll-area"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.ScrollArea className="h-56 rounded-xl border"><div className="space-y-3 p-5">{Array.from({ length: 20 }, (_, index) => <p key={index} className="border-b pb-3 text-sm">Component specimen {String(index + 1).padStart(2, "0")}</p>)}</div></UI.ScrollArea></div>
}

const meta = { title: "Components/Scroll Area", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
