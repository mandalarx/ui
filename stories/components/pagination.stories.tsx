import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/pagination"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Pagination><UI.PaginationContent><UI.PaginationItem><UI.PaginationPrevious href="#previous" /></UI.PaginationItem><UI.PaginationItem><UI.PaginationLink href="#1" isActive>1</UI.PaginationLink></UI.PaginationItem><UI.PaginationItem><UI.PaginationLink href="#2">2</UI.PaginationLink></UI.PaginationItem><UI.PaginationItem><UI.PaginationNext href="#next" /></UI.PaginationItem></UI.PaginationContent></UI.Pagination></div>
}

const meta = { title: "Components/Pagination", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
