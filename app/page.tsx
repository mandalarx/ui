import { Button } from "@/components/ui/button"

export default function Home() {
  return <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-5 p-8">
    <h1 className="text-3xl font-semibold tracking-tight">The component workbench lives in Storybook.</h1>
    <p className="leading-7 text-muted-foreground">Explore all 61 components, 97 blocks, design foundations, and interaction examples.</p>
    <Button asChild><a href="https://mandalar-ui.heinthantaung191.chatgpt.site">Open the workbench</a></Button>
    <p className="text-sm text-muted-foreground">For local development, start Storybook with <code className="font-mono">pnpm storybook</code>.</p>
  </main>
}
