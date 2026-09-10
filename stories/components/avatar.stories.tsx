import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/avatar"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><><UI.Avatar><UI.AvatarFallback>VA</UI.AvatarFallback></UI.Avatar><UI.Avatar><UI.AvatarImage src="/missing-avatar.png" alt="Designer" /><UI.AvatarFallback>DS</UI.AvatarFallback></UI.Avatar><p className="text-sm text-muted-foreground">Initials remain readable when an image is unavailable.</p></></div>
}

const meta = { title: "Components/Avatar", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
