import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/command"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Command className="rounded-xl border"><UI.CommandInput placeholder="Find a component…" /><UI.CommandList><UI.CommandEmpty>No matches.</UI.CommandEmpty><UI.CommandGroup heading="Library"><UI.CommandItem>Buttons</UI.CommandItem><UI.CommandItem>Dialogs</UI.CommandItem><UI.CommandItem>Tabs</UI.CommandItem></UI.CommandGroup></UI.CommandList></UI.Command></div>
}

const meta = { title: "Components/Command", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
