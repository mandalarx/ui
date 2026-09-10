import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Sheet><UI.SheetTrigger asChild><Button>Open inspector</Button></UI.SheetTrigger><UI.SheetContent><UI.SheetHeader><UI.SheetTitle>Component inspector</UI.SheetTitle><UI.SheetDescription>A focused side panel for contextual details.</UI.SheetDescription></UI.SheetHeader><UI.SheetFooter><UI.SheetClose asChild><Button>Done</Button></UI.SheetClose></UI.SheetFooter></UI.SheetContent></UI.Sheet></div>
}

const meta = { title: "Components/Sheet", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
