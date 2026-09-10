import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/breadcrumb"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.Breadcrumb><UI.BreadcrumbList><UI.BreadcrumbItem><UI.BreadcrumbLink href="#library">Library</UI.BreadcrumbLink></UI.BreadcrumbItem><UI.BreadcrumbSeparator /><UI.BreadcrumbItem><UI.BreadcrumbPage>Components</UI.BreadcrumbPage></UI.BreadcrumbItem></UI.BreadcrumbList></UI.Breadcrumb></div>
}

const meta = { title: "Components/Breadcrumb", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
