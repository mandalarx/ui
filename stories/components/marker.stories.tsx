import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/marker"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><UI.Marker><UI.MarkerContent>Today · September 10</UI.MarkerContent></UI.Marker><UI.Marker variant="separator"><UI.MarkerContent>New messages</UI.MarkerContent></UI.Marker></></div>
}

const meta = { title: "Components/Marker", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
