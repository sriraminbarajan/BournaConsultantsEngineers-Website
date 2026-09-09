import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  suffix?: string
  durationMs?: number
  format?: (n: number) => string
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export function CountUp({
  value,
  suffix = '',
  durationMs = 1600,
  format = (n) => String(Math.round(n)),
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const finalLabel = `${format(value)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplay(value)
      setStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  useEffect(() => {
    if (!started) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      setDisplay(value * easeOutCubic(t))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, value, durationMs])

  return (
    <span ref={ref} aria-label={finalLabel}>
      <span aria-hidden="true">
        {format(display)}
        {suffix}
      </span>
    </span>
  )
}
