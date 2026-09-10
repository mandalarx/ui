import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Drawer><UI.DrawerTrigger asChild><Button>Open drawer</Button></UI.DrawerTrigger><UI.DrawerContent><div className="mx-auto w-full max-w-md p-6"><UI.DrawerHeader><UI.DrawerTitle>Adjust your view</UI.DrawerTitle><UI.DrawerDescription>A touch-friendly surface for focused tasks.</UI.DrawerDescription></UI.DrawerHeader><UI.DrawerFooter><UI.DrawerClose asChild><Button>Done</Button></UI.DrawerClose></UI.DrawerFooter></div></UI.DrawerContent></UI.Drawer></div>
}

const meta = { title: "Components/Drawer", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
