import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.FieldSet><UI.FieldLegend>Collection settings</UI.FieldLegend><UI.Field><UI.FieldLabel htmlFor="field-name">Name</UI.FieldLabel><Input id="field-name" defaultValue="Azure Blueprint" /><UI.FieldDescription>A short, recognizable name.</UI.FieldDescription></UI.Field><UI.Field data-invalid><UI.FieldLabel htmlFor="field-slug">Slug</UI.FieldLabel><Input id="field-slug" aria-invalid defaultValue="azure azure" aria-describedby="field-error" /><UI.FieldError id="field-error">Use hyphens instead of spaces.</UI.FieldError></UI.Field></UI.FieldSet></div>
}

const meta = { title: "Components/Field", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
