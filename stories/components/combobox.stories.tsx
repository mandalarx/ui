import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/combobox"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Combobox items={["Azure", "Graphite", "Porcelain"]}><UI.ComboboxInput aria-label="Choose a color" placeholder="Choose a color" /><UI.ComboboxContent><UI.ComboboxEmpty>No color found.</UI.ComboboxEmpty><UI.ComboboxList>{(item: string) => <UI.ComboboxItem key={item} value={item}>{item}</UI.ComboboxItem>}</UI.ComboboxList></UI.ComboboxContent></UI.Combobox></div>
}

const meta = { title: "Components/Combobox", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
