"use client"

import { useEffect, useRef, useState } from "react"

type AnimateInProps = {
  children: React.ReactNode
  delay?: number          // ms delay before animating
  direction?: "up" | "left" | "right" | "none"
  distance?: number       // px offset to animate from
  className?: string
  style?: React.CSSProperties
  once?: boolean          // only animate once (default true)
}

export function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  distance = 28,
  className,
  style,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const translate = {
    up:    `0, ${distance}px`,
    left:  `-${distance}px, 0`,
    right: `${distance}px, 0`,
    none:  "0, 0",
  }[direction]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : `translate(${translate})`,
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
