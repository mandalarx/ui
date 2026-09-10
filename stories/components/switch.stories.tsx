import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/switch"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><label className="flex items-center justify-between gap-4"><span>Enable notifications</span><UI.Switch defaultChecked /></label><label className="flex items-center justify-between gap-4"><span>Compact switch</span><UI.Switch size="sm" /></label><label className="flex items-center justify-between gap-4 text-muted-foreground"><span>Managed by workspace</span><UI.Switch disabled /></label></></div>
}

const meta = { title: "Components/Switch", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
