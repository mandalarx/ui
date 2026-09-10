/// <reference types="vite/client" />
import type { Decorator, Preview } from "@storybook/nextjs-vite"
import { lazy, Suspense, useEffect, useSyncExternalStore } from "react"
import { useTheme, ThemeProvider } from "next-themes"
import type { DocsContainer as DocsContainerType } from "@storybook/addon-docs/blocks"
import { MotionProvider } from "../components/motion-provider"
import { TooltipProvider } from "../components/ui/tooltip"
import { atelierTheme } from "./atelier-theme"

import "@fontsource-variable/manrope"
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/500.css"
import "@fontsource/ibm-plex-mono/600.css"
import "../app/globals.css"

// Load docs only after its renderer is initialized; eager imports break the static renderer.
const DocsContainer = lazy(async () => ({ default: (await import("@storybook/addon-docs/blocks")).DocsContainer }))

function ThemeSelection({ value, motion }: { value?: string; motion?: string }) {
  const { setTheme } = useTheme()
  useEffect(() => { if (value) setTheme(value) }, [value, setTheme])
  useEffect(() => { document.documentElement.dataset.motion = motion ?? "system" }, [motion])
  return null
}
const withTheme: Decorator = (Story, context) => (
  <ThemeProvider attribute="class" defaultTheme="system" storageKey="atelier-theme" enableSystem disableTransitionOnChange>
    <ThemeSelection value={context.globals.theme} motion={context.globals.motion} />
    <MotionProvider reducedMotion={context.globals.motion === "reduced" ? "always" : "user"}>
      <TooltipProvider><div data-motion={context.globals.motion} className={`${context.viewMode === "docs" ? "" : "min-h-screen"} bg-background text-foreground ${context.parameters.layout === "fullscreen" ? "" : "p-4 sm:p-8"}`}><Story /></div></TooltipProvider>
    </MotionProvider>
  </ThemeProvider>
)

function ThemedDocs(props: React.ComponentProps<typeof DocsContainerType>) {
  return <ThemeProvider attribute="class" defaultTheme="system" storageKey="atelier-theme" enableSystem><Suspense fallback={<p>Loading documentation…</p>}><DocsTheme {...props} /></Suspense></ThemeProvider>
}
function DocsTheme(props: React.ComponentProps<typeof DocsContainerType>) {
  const dark = useSyncExternalStore(subscribeToTheme, () => document.documentElement.classList.contains("dark"), () => false)
  return <DocsContainer {...props} theme={atelierTheme(dark)} />
}
function subscribeToTheme(update: () => void) {
  const observer = new MutationObserver(update)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Design-system theme",
      toolbar: { icon: "mirror", dynamicTitle: true, items: [{ value: "system", title: "System" }, { value: "light", title: "Light" }, { value: "dark", title: "Dark" }] },
    },
    motion: { description: "Motion preference", toolbar: { icon: "play", items: [{ value: "system", title: "System motion" }, { value: "reduced", title: "Reduced motion" }] } },
  },
  initialGlobals: { theme: import.meta.env.VITE_ATELIER_THEME || undefined, motion: "system" },
  parameters: {
    a11y: { test: "error" },
    controls: { expanded: true },
    docs: { container: ThemedDocs },
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
