import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><div className="flex flex-wrap items-center gap-3">{(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map(variant => <UI.Button key={variant} variant={variant}>{variant}</UI.Button>)}<UI.Button disabled>Unavailable</UI.Button><UI.Button asChild variant="outline"><a href="#example">Link via asChild</a></UI.Button></div></div>
}

const meta = { title: "Components/Button", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
