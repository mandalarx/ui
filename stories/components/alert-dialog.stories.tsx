import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.AlertDialog><UI.AlertDialogTrigger asChild><Button>Remove draft</Button></UI.AlertDialogTrigger><UI.AlertDialogContent><UI.AlertDialogHeader><UI.AlertDialogTitle>Remove this draft?</UI.AlertDialogTitle><UI.AlertDialogDescription>This example demonstrates a consequential confirmation.</UI.AlertDialogDescription></UI.AlertDialogHeader><UI.AlertDialogFooter><UI.AlertDialogCancel>Keep draft</UI.AlertDialogCancel><UI.AlertDialogAction>Remove</UI.AlertDialogAction></UI.AlertDialogFooter></UI.AlertDialogContent></UI.AlertDialog></div>
}

const meta = { title: "Components/Alert Dialog", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
