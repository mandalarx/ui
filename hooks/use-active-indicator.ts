"use client"

import { useEffect, useImperativeHandle, useRef } from "react"
import { animate } from "motion/react"
import { atelierSpring, useMotionPreference } from "@/components/motion-provider"

/** The trailing edge follows on a softer spring, so the pill stretches toward its target, then settles. */
const trailingSpring = { type: "spring", stiffness: 260, damping: 30, mass: 0.8 } as const

type Edge = "left" | "right" | "top" | "bottom"
type Edges = Record<Edge, number>
const edges: readonly Edge[] = ["left", "right", "top", "bottom"]

/** Measures primitive-owned state without taking over selection, refs, or keyboard handling. */
export function useActiveIndicator<T extends HTMLElement>(forwardedRef?: React.Ref<T>) {
  const element = useRef<T | null>(null)
  const reduced = useMotionPreference()
  useImperativeHandle(forwardedRef, () => element.current!, [])

  useEffect(() => {
    const list = element.current
    if (!list) return
    let current: Edges | undefined
    let playback: ReturnType<typeof animate>[] = []
    const update = () => {
      const active = list.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]')
      list.style.setProperty("--indicator-opacity", active ? "1" : "0")
      if (!active) return
      const next: Edges = {
        left: active.offsetLeft,
        right: active.offsetLeft + active.offsetWidth,
        top: active.offsetTop,
        bottom: active.offsetTop + active.offsetHeight,
      }
      playback.forEach(animation => animation.stop())
      playback = []
      if (!current || reduced) {
        for (const edge of edges) list.style.setProperty(`--indicator-${edge}`, `${next[edge]}px`)
      } else {
        const previous = current
        for (const edge of edges) {
          if (next[edge] === previous[edge]) continue
          // The edge facing the direction of travel leads on the house spring.
          const start = edge === "left" || edge === "right" ? "left" : "top"
          const forward = next[start] > previous[start]
          const leads = edge === "right" || edge === "bottom" ? forward : !forward
          playback.push(animate(list, { [`--indicator-${edge}`]: `${next[edge]}px` }, leads ? atelierSpring : trailingSpring))
        }
      }
      current = next
    }
    update()
    const changes = new MutationObserver(update)
    changes.observe(list, { subtree: true, attributes: true, attributeFilter: ["data-state"], childList: true })
    const sizes = new ResizeObserver(update)
    sizes.observe(list)
    for (const child of list.children) sizes.observe(child)
    return () => { playback.forEach(animation => animation.stop()); changes.disconnect(); sizes.disconnect() }
  }, [reduced])
  return element
}
