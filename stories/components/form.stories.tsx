import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

function Example() {
  const form = useForm({ defaultValues: { name: "" } })
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Form {...form}><form onSubmit={form.handleSubmit(() => undefined)} className="space-y-4"><UI.FormField control={form.control} name="name" rules={{ required: "Please enter a collection name." }} render={({ field }) => <UI.FormItem><UI.FormLabel>Collection name</UI.FormLabel><UI.FormControl><Input {...field} placeholder="Azure Blueprint" /></UI.FormControl><UI.FormDescription>Leave empty and submit to inspect validation.</UI.FormDescription><UI.FormMessage /></UI.FormItem>} /><Button type="submit">Validate</Button></form></UI.Form></div>
}

const meta = { title: "Components/Form", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
