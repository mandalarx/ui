import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/resizable"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.ResizablePanelGroup orientation="horizontal" className="min-h-48 rounded-xl border"><UI.ResizablePanel defaultSize={35}><div className="p-5 text-sm">Navigation</div></UI.ResizablePanel><UI.ResizableHandle withHandle /><UI.ResizablePanel defaultSize={65}><div className="p-5 text-sm">Drag the handle or use arrow keys to resize.</div></UI.ResizablePanel></UI.ResizablePanelGroup></div>
}

const meta = { title: "Components/Resizable", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
