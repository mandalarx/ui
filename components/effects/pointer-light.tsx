"use client"

import { useEffect, useImperativeHandle, useRef } from "react"

/**
 * Follows a mouse or pen across an element as `--light-x` / `--light-y`, at most once per frame.
 * Put `data-light="follow"` on the same element and import components/effects/effects.css.
 * Touch is ignored: there is no hover to follow.
 */
export function usePointerLight<T extends HTMLElement>(forwardedRef?: React.Ref<T>) {
  const element = useRef<T | null>(null)
  useImperativeHandle(forwardedRef, () => element.current!, [])

  useEffect(() => {
    const node = element.current
    if (!node) return
    let frame = 0
    let point: { x: number; y: number } | undefined
    const paint = () => {
      frame = 0
      if (!point) return
      const box = node.getBoundingClientRect()
      node.style.setProperty("--light-x", `${((point.x - box.left) / box.width * 100).toFixed(1)}%`)
      node.style.setProperty("--light-y", `${((point.y - box.top) / box.height * 100).toFixed(1)}%`)
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      point = { x: event.clientX, y: event.clientY }
      node.setAttribute("data-lit", "")
      frame ||= requestAnimationFrame(paint)
    }
    const leave = () => { point = undefined; node.removeAttribute("data-lit") }
    node.addEventListener("pointermove", move)
    node.addEventListener("pointerleave", leave)
    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener("pointermove", move)
      node.removeEventListener("pointerleave", leave)
    }
  }, [])
  return element
}
