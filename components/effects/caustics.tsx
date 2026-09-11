"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type CausticsProps = React.ComponentProps<"div"> & {
  /** Strength of the light lines, from 0 to 1. */
  intensity?: number
  /** "sunlit" adds a little warmth to the light. */
  tint?: "cool" | "sunlit"
  /** The side the pattern fades away toward, keeping text there on a quiet ground. */
  fade?: "left" | "right" | "top" | "bottom" | "none"
  /** Set to false for a second brand panel on the same view: the light holds still. */
  animated?: boolean
}

/**
 * Water light drifting across a brand panel. One moving panel per view.
 * Place it inside a `relative isolate overflow-hidden` container. Requires components/effects/effects.css.
 */
export function Caustics({ intensity = .6, tint = "cool", fade = "none", animated = true, className, style, ref, ...props }: CausticsProps) {
  const element = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => element.current!, [])

  React.useEffect(() => {
    const node = element.current
    if (!animated || !node || typeof IntersectionObserver === "undefined") return
    // Pause the drift while off-screen. Hidden tabs already stop CSS animations.
    const observer = new IntersectionObserver(([entry]) => node.toggleAttribute("data-paused", !entry.isIntersecting))
    observer.observe(node)
    return () => observer.disconnect()
  }, [animated])

  return <div ref={element} aria-hidden="true" data-slot="caustics" data-tint={tint} data-fade={fade} data-still={animated ? undefined : ""}
    className={cn("azure-caustics", className)}
    style={{ "--caustic-opacity": intensity, ...style } as React.CSSProperties} {...props} />
}
