import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/carousel"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Carousel className="mx-auto w-[calc(100%-5rem)]"><UI.CarouselContent>{[1, 2, 3].map(n => <UI.CarouselItem key={n}><div className="grid h-48 place-items-center rounded-2xl border bg-card font-mono text-4xl">{n}</div></UI.CarouselItem>)}</UI.CarouselContent><UI.CarouselPrevious /><UI.CarouselNext /></UI.Carousel></div>
}

const meta = { title: "Components/Carousel", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
