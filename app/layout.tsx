import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MotionProvider } from "@/components/motion-provider"

import "@fontsource-variable/manrope"
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/500.css"
import "@fontsource/ibm-plex-mono/600.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mandalar UI",
  description: "The azure and glass component system built on shadcn/ui.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider><TooltipProvider>{children}</TooltipProvider></MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
