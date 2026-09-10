import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.ButtonGroup aria-label="Editing actions"><Button variant="outline">Undo</Button><Button variant="outline">Redo</Button><UI.ButtonGroupSeparator /><Button>Save</Button></UI.ButtonGroup></div>
}

const meta = { title: "Components/Button Group", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
