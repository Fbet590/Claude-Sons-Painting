"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface HandDrawnUnderlineProps {
  children: ReactNode
  /** Stroke color of the ink line. Defaults to a deep brass/amber ink tone. */
  color?: string
  /** Stroke thickness in SVG units. Defaults to a thin pen-like 3. */
  strokeWidth?: number
  /** Draw duration in seconds. Defaults to 0.9s. */
  duration?: number
  className?: string
}

/**
 * An animated, hand-drawn ink-pen underline that sits beneath its children.
 * The path is an intentionally irregular, wobbly bezier with flat (butt) stroke
 * ends so it reads like a fine-liner stroke rather than a marker or CSS border.
 * It draws left-to-right when scrolled into view and re-triggers on re-entry.
 */
export function HandDrawnUnderline({
  children,
  color = "#7a3b0a",
  strokeWidth = 3,
  duration = 0.9,
  className,
}: HandDrawnUnderlineProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset then play so it re-triggers each time it re-enters.
          setInView(false)
          // Force reflow on the path so the dash animation restarts cleanly.
          if (pathRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            pathRef.current.getBoundingClientRect()
          }
          requestAnimationFrame(() => setInView(true))
        } else {
          setInView(false)
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={wrapperRef} className={`relative inline-block ${className ?? ""}`}>
      {children}
      <svg
        className="pointer-events-none absolute left-0 w-full"
        style={{ bottom: "-0.22em", height: "0.4em", overflow: "visible" }}
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M3,10 C26,5 48,12 72,8 C98,4 120,13 146,9 C170,5.5 196,11.5 222,7.5 C246,4 270,11 297,6"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: inView
              ? `stroke-dashoffset ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
          }}
        />
      </svg>
    </span>
  )
}
