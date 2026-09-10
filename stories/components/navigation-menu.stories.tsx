import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/navigation-menu"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.NavigationMenu><UI.NavigationMenuList><UI.NavigationMenuItem><UI.NavigationMenuTrigger>Foundations</UI.NavigationMenuTrigger><UI.NavigationMenuContent className="min-w-56"><UI.NavigationMenuLink href="#color">Color</UI.NavigationMenuLink><UI.NavigationMenuLink href="#motion">Motion</UI.NavigationMenuLink></UI.NavigationMenuContent></UI.NavigationMenuItem><UI.NavigationMenuItem><UI.NavigationMenuLink href="#components">Components</UI.NavigationMenuLink></UI.NavigationMenuItem></UI.NavigationMenuList></UI.NavigationMenu></div>
}

const meta = { title: "Components/Navigation Menu", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
