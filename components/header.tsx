"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { usePointerLight } from "@/components/effects/pointer-light"

type HeaderLink = {
  id: string
  label: string
  href: string
  description?: string
  icon?: React.ReactNode
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
}

export type HeaderNavItem = HeaderLink | {
  id: string
  label: string
  children: readonly HeaderLink[]
}

export type HeaderAction = HeaderLink & { variant?: "primary" | "secondary" }

export type HeaderProps = {
  brand: React.ReactNode
  brandHref: string
  brandLabel: string
  items: readonly HeaderNavItem[]
  actions?: readonly HeaderAction[]
  activeHref?: string
  sticky?: boolean
  className?: string
  /** Must spread anchor attributes and forward ref to the underlying anchor. */
  linkComponent?: React.ComponentType<React.ComponentPropsWithRef<"a">>
  navigationLabel?: string
  menuButtonLabel?: string
  menuTitle?: string
}

/** Copyable website navigation. No router, theme provider, or Motion provider required. */
export function Header({
  brand, brandHref, brandLabel, items, actions = [], activeHref,
  sticky = true, className, linkComponent,
  navigationLabel = "Main navigation", menuButtonLabel = "Open navigation",
  menuTitle = "Navigation",
}: HeaderProps) {
  const Link = linkComponent ?? "a"
  const [open, setOpen] = React.useState(false)
  const brandRef = React.useRef<HTMLAnchorElement>(null)
  const desktopResize = React.useRef(false)
  const barRef = usePointerLight<HTMLDivElement>()

  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => {
      if (desktop.matches) {
        desktopResize.current = true
        setOpen(false)
      }
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  const active = (item: HeaderNavItem) => "children" in item
    ? item.children.some(link => link.href === activeHref)
    : item.href === activeHref
  const renderLink = (item: HeaderLink, mobile = false) => (
    <Link href={item.href} target={item.target} rel={item.rel}
      aria-current={item.href === activeHref ? "page" : undefined}
      className="header-link" onClick={mobile ? () => setOpen(false) : undefined}>
      {item.icon && <span aria-hidden="true" className="header-link-icon">{item.icon}</span>}
      <span className="min-w-0"><span className="block font-medium">{item.label}</span>
        {item.description && <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>}
      </span>
    </Link>
  )
  const renderActions = (mobile = false) => actions.map(action => (
    <Button key={action.id} asChild variant={action.variant === "secondary" ? "secondary" : "default"}>
      <Link href={action.href} target={action.target} rel={action.rel}
        onClick={mobile ? () => setOpen(false) : undefined}>
        {action.icon && <span aria-hidden="true">{action.icon}</span>}{action.label}
      </Link>
    </Button>
  ))

  return <header data-slot="header" data-sticky={sticky} className={cn("azure-header", className)}>
    <div ref={barRef} data-surface="glass" data-light="follow" className="header-bar">
      <Link ref={brandRef} href={brandHref} aria-label={brandLabel} className="header-brand">{brand}</Link>
      <div className="header-desktop">
        <NavigationMenu aria-label={navigationLabel} viewport={false}>
          <NavigationMenuList className="flex-wrap">
            {items.map(item => <NavigationMenuItem key={item.id}>
              {"children" in item ? <>
                <NavigationMenuTrigger data-active={active(item)}>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent className="header-dropdown">
                  {item.children.map(link => <NavigationMenuLink key={link.id} asChild active={link.href === activeHref}>{renderLink(link)}</NavigationMenuLink>)}
                </NavigationMenuContent>
              </> : <NavigationMenuLink asChild active={active(item)}>{renderLink(item)}</NavigationMenuLink>}
            </NavigationMenuItem>)}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {actions.length > 0 && <div className="header-actions header-desktop">{renderActions()}</div>}
      <div className="header-mobile">
        <Sheet open={open} onOpenChange={value => { desktopResize.current = false; setOpen(value) }}>
          <SheetTrigger asChild><Button variant="ghost" size="icon-lg" aria-label={menuButtonLabel}><MenuIcon aria-hidden="true" /></Button></SheetTrigger>
          <SheetContent className="header-sheet" aria-describedby={undefined} onCloseAutoFocus={event => {
            if (desktopResize.current) { event.preventDefault(); brandRef.current?.focus(); desktopResize.current = false }
          }}>
            <SheetHeader><SheetTitle>{menuTitle}</SheetTitle></SheetHeader>
            <nav aria-label={navigationLabel} className="px-4">
              <Accordion type="multiple">
                {items.map(item => "children" in item
                  ? <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger data-active={active(item)}>{item.label}</AccordionTrigger>
                    <AccordionContent>{item.children.map(link => <React.Fragment key={link.id}>{renderLink(link, true)}</React.Fragment>)}</AccordionContent>
                  </AccordionItem>
                  : <div key={item.id}>{renderLink(item, true)}</div>)}
              </Accordion>
            </nav>
            {actions.length > 0 && <div className="header-mobile-actions">{renderActions(true)}</div>}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
}
