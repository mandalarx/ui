import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MotionProvider } from "@/components/motion-provider"

import "@fontsource-variable/geist"
import "@fontsource-variable/inter"
import "@fontsource-variable/geist-mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "MandalarX UI",
  description: "Flat, ruled azure components built on shadcn/ui.",
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
