import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Dialog><UI.DialogTrigger asChild><Button>Edit collection</Button></UI.DialogTrigger><UI.DialogContent><UI.DialogHeader><UI.DialogTitle>Edit collection</UI.DialogTitle><UI.DialogDescription>Update the collection name, then save your changes.</UI.DialogDescription></UI.DialogHeader><label className="space-y-2 text-sm">Name<Input defaultValue="Azure Blueprint" /></label><UI.DialogFooter><UI.DialogClose asChild><Button variant="outline">Cancel</Button></UI.DialogClose><UI.DialogClose asChild><Button>Save changes</Button></UI.DialogClose></UI.DialogFooter></UI.DialogContent></UI.Dialog></div>
}

const meta = { title: "Components/Dialog", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
