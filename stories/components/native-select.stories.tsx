import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/native-select"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><label className="space-y-2 text-sm">Color family<UI.NativeSelect defaultValue="azure"><UI.NativeSelectOption value="azure">Azure</UI.NativeSelectOption><UI.NativeSelectOption value="graphite">Graphite</UI.NativeSelectOption></UI.NativeSelect></label><UI.NativeSelect disabled aria-label="Disabled color family"><UI.NativeSelectOption>Locked</UI.NativeSelectOption></UI.NativeSelect></></div>
}

const meta = { title: "Components/Native Select", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
