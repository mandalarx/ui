import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.DropdownMenu><UI.DropdownMenuTrigger asChild><Button variant="outline">Collection actions</Button></UI.DropdownMenuTrigger><UI.DropdownMenuContent><UI.DropdownMenuLabel>Violet Atelier</UI.DropdownMenuLabel><UI.DropdownMenuItem>Rename</UI.DropdownMenuItem><UI.DropdownMenuItem>Duplicate</UI.DropdownMenuItem><UI.DropdownMenuItem>Export tokens</UI.DropdownMenuItem><UI.DropdownMenuSeparator /><UI.DropdownMenuItem disabled>Delete published version</UI.DropdownMenuItem></UI.DropdownMenuContent></UI.DropdownMenu></div>
}

const meta = { title: "Components/Dropdown Menu", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
