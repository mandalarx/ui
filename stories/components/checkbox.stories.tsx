import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/checkbox"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><label className="flex items-center gap-3"><UI.Checkbox defaultChecked />Include component examples</label><label className="flex items-center gap-3"><UI.Checkbox checked="indeterminate" />Partially selected</label><label className="flex items-center gap-3 text-muted-foreground"><UI.Checkbox disabled />Locked option</label></></div>
}

const meta = { title: "Components/Checkbox", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
