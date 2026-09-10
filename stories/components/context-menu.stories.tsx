import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/context-menu"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.ContextMenu><UI.ContextMenuTrigger className="grid h-40 place-items-center rounded-2xl border border-dashed">Right-click for actions</UI.ContextMenuTrigger><UI.ContextMenuContent><UI.ContextMenuItem>Duplicate</UI.ContextMenuItem><UI.ContextMenuItem>Rename</UI.ContextMenuItem><UI.ContextMenuSeparator /><UI.ContextMenuItem disabled>Archive locked item</UI.ContextMenuItem></UI.ContextMenuContent></UI.ContextMenu></div>
}

const meta = { title: "Components/Context Menu", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
