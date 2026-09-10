import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/kbd"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><p className="text-sm">Open search with <UI.KbdGroup><UI.Kbd>⌘</UI.Kbd><UI.Kbd>K</UI.Kbd></UI.KbdGroup></p></div>
}

const meta = { title: "Components/Kbd", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
