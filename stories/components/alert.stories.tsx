import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/alert"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><UI.Alert><UI.AlertTitle>Changes saved</UI.AlertTitle><UI.AlertDescription>Your design tokens are ready for use.</UI.AlertDescription></UI.Alert><UI.Alert variant="destructive"><UI.AlertTitle>Unable to save</UI.AlertTitle><UI.AlertDescription>Review the invalid values before trying again.</UI.AlertDescription></UI.Alert></></div>
}

const meta = { title: "Components/Alert", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
