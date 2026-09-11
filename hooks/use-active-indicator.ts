"use client"

import { useEffect, useImperativeHandle, useRef } from "react"
import { animate } from "motion/react"
import { atelierSpring, useMotionPreference } from "@/components/motion-provider"

/** Measures primitive-owned state without taking over selection, refs, or keyboard handling. */
export function useActiveIndicator<T extends HTMLElement>(forwardedRef?: React.Ref<T>) {
  const element = useRef<T | null>(null)
  const reduced = useMotionPreference()
  useImperativeHandle(forwardedRef, () => element.current!, [])

  useEffect(() => {
    const list = element.current
    if (!list) return
    let initialized = false
    let playback: ReturnType<typeof animate> | undefined
    const update = () => {
      const active = list.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]')
      list.style.setProperty("--indicator-opacity", active ? "1" : "0")
      if (!active) return
      const target = {
        "--indicator-x": `${active.offsetLeft}px`,
        "--indicator-y": `${active.offsetTop}px`,
        "--indicator-width": `${active.offsetWidth}px`,
        "--indicator-height": `${active.offsetHeight}px`,
      }
      playback?.stop()
      if (!initialized || reduced) {
        Object.entries(target).forEach(([key, value]) => list.style.setProperty(key, value))
      } else {
        playback = animate(list, target, atelierSpring)
      }
      initialized = true
    }
    update()
    const changes = new MutationObserver(update)
    changes.observe(list, { subtree: true, attributes: true, attributeFilter: ["data-state"], childList: true })
    const sizes = new ResizeObserver(update)
    sizes.observe(list)
    for (const child of list.children) sizes.observe(child)
    return () => { playback?.stop(); changes.disconnect(); sizes.disconnect() }
  }, [reduced])
  return element
}
