import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/menubar"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Menubar><UI.MenubarMenu><UI.MenubarTrigger>File</UI.MenubarTrigger><UI.MenubarContent><UI.MenubarItem>New collection</UI.MenubarItem><UI.MenubarItem>Open</UI.MenubarItem><UI.MenubarSeparator /><UI.MenubarItem>Export</UI.MenubarItem></UI.MenubarContent></UI.MenubarMenu><UI.MenubarMenu><UI.MenubarTrigger>Edit</UI.MenubarTrigger><UI.MenubarContent><UI.MenubarItem>Undo</UI.MenubarItem><UI.MenubarItem>Redo</UI.MenubarItem></UI.MenubarContent></UI.MenubarMenu></UI.Menubar></div>
}

const meta = { title: "Components/Menubar", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
