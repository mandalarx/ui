import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Empty className="border"><UI.EmptyHeader><UI.EmptyTitle>No saved components</UI.EmptyTitle><UI.EmptyDescription>Your reusable collection starts here.</UI.EmptyDescription></UI.EmptyHeader><UI.EmptyContent><Button>Browse components</Button></UI.EmptyContent></UI.Empty></div>
}

const meta = { title: "Components/Empty", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
