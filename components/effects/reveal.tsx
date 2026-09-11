"use client"

import * as React from "react"

export type RevealProps = React.ComponentProps<"div"> & {
  /** "frost" clears children from a blur; "rise" lifts them into place. */
  variant?: "frost" | "rise"
}

/**
 * One orchestrated entrance per view. Direct children arrive in sequence, once, when first seen.
 * Content stays in the DOM and readable throughout. Requires components/effects/effects.css.
 */
export function Reveal({ variant = "frost", ref, ...props }: RevealProps) {
  const element = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => element.current!, [])

  React.useLayoutEffect(() => {
    const node = element.current
    if (!node || typeof IntersectionObserver === "undefined" || node.dataset.revealState === "shown") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || node.closest('[data-motion="reduced"]')) return
    // Hidden only once scripts run, before first paint, so a script failure never hides content.
    node.dataset.revealState = "pending"
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      node.dataset.revealState = "shown"
      observer.disconnect()
    }, { rootMargin: "0px 0px -8% 0px" })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={element} data-slot="reveal" data-reveal={variant} {...props} />
}
