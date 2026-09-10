import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><UI.Toaster /><Button onClick={() => toast.success("Tokens saved", { description: "Your collection is up to date." })}>Show success toast</Button><Button variant="outline" onClick={() => toast.error("Unable to save", { description: "Review your changes and retry." })}>Show error toast</Button></></div>
}

const meta = { title: "Components/Sonner", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
