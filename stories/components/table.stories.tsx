import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/table"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Table><UI.TableCaption>Collection coverage</UI.TableCaption><UI.TableHeader><UI.TableRow><UI.TableHead>Area</UI.TableHead><UI.TableHead className="text-right">Count</UI.TableHead></UI.TableRow></UI.TableHeader><UI.TableBody>{[["Components", 61], ["Blocks", 97]].map(([name, count]) => <UI.TableRow key={name}><UI.TableCell>{name}</UI.TableCell><UI.TableCell className="text-right font-mono">{count}</UI.TableCell></UI.TableRow>)}</UI.TableBody></UI.Table></div>
}

const meta = { title: "Components/Table", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
