import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/direction"
import { Button } from "@/components/ui/button"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.DirectionProvider dir="rtl"><div dir="rtl" className="space-y-3 rounded-xl border p-5"><p>مرحبا — Violet Atelier</p><div className="flex gap-2"><Button>التالي</Button><Button variant="outline">السابق</Button></div></div></UI.DirectionProvider></div>
}

const meta = { title: "Components/Direction", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
