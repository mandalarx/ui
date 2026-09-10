import type { Decorator, Preview } from "@storybook/nextjs-vite"

import "@fontsource-variable/manrope"
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/500.css"
import "@fontsource/ibm-plex-mono/600.css"
import "../app/globals.css"

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === "dark" ? "dark" : "light"
  globalThis.document?.documentElement.classList.toggle("dark", theme === "dark")
  return <div className="min-h-screen bg-background p-4 text-foreground sm:p-8"><Story /></div>
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Design-system theme",
      toolbar: { icon: "mirror", items: [{ value: "light", title: "Light" }, { value: "dark", title: "Dark" }] },
    },
  },
  initialGlobals: { theme: "light" },
  parameters: {
    a11y: { test: "error" },
    controls: { expanded: true },
    options: { storySort: { order: ["Foundations", "Components", "Blocks"] } },
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "1000px" } },
      },
    },
  },
  tags: ["autodocs"],
}

export default preview
