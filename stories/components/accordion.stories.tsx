import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/accordion"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Accordion type="single" collapsible><UI.AccordionItem value="motion"><UI.AccordionTrigger>What makes Azure move?</UI.AccordionTrigger><UI.AccordionContent>State changes use fluid easing. Reduced motion preserves every interaction.</UI.AccordionContent></UI.AccordionItem><UI.AccordionItem value="tokens"><UI.AccordionTrigger>Can I customize the tokens?</UI.AccordionTrigger><UI.AccordionContent>Change semantic colors and motion variables in globals.css.</UI.AccordionContent></UI.AccordionItem></UI.Accordion></div>
}

const meta = { title: "Components/Accordion", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
