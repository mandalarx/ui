import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Card><UI.CardHeader><UI.CardTitle>A place for your ideas</UI.CardTitle><UI.CardDescription>Fine borders, soft depth, and a precise 20px radius.</UI.CardDescription></UI.CardHeader><UI.CardContent><p className="text-sm">Compose cards with any of the shared primitives.</p></UI.CardContent><UI.CardFooter><Button>Explore collection</Button></UI.CardFooter></UI.Card></div>
}

const meta = { title: "Components/Card", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
