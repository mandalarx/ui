import { createRoot } from "react-dom/client"
import { Header } from "./components/header"
import "@fontsource-variable/geist"
import "@fontsource-variable/inter"
import "./app/globals.css"

createRoot(document.getElementById("root")!).render(<>
  <Header brand="Your brand" brandHref="#home" brandLabel="Your brand home" activeHref="#guide"
    items={[
      { id: "product", label: "Product", children: [
        { id: "guide", label: "Guide", href: "#guide", description: "Start with the essentials." },
        { id: "features", label: "Features", href: "#features" },
      ] },
      { id: "about", label: "About", href: "#about" },
    ]}
    actions={[{ id: "start", label: "Get started", href: "#start" }]} />
  <main className="mx-auto max-w-5xl px-8">
    {["home", "guide", "features", "about", "start"].map(id => <section key={id} id={id} className="min-h-96 scroll-mt-32 py-16"><h1 className="text-4xl font-semibold capitalize">{id}</h1><p className="mt-6">A plain React app with Azure Blueprint navigation.</p></section>)}
  </main>
</>)
