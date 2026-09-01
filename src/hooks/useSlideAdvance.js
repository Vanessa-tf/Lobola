import { useEffect, useRef, useState } from 'react'
import { useElapsedTime } from './useElapsedTime.js'

/**
 * Drives one slide of the intro presentation: tracks elapsed *active* time
 * since the slide became `active`, lets a press-and-hold anywhere on the
 * slide pause that clock (so it can be read at your own pace), and fires
 * `onDone` once the slide has shown for `leaveAt` ms plus its exit animation.
 *
 * Returns `sectionRef` (attach to the slide's root element -- this is what
 * listens for the hold), `paused`, `leaving`, and `elapsed`.
 */
export function useSlideAdvance({ active, leaveAt, exitDuration, onDone }) {
  const sectionRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const doneFiredRef = useRef(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el || reduced) return
    const pause = () => setPaused(true)
    const resume = () => setPaused(false)
    el.addEventListener('pointerdown', pause)
    window.addEventListener('pointerup', resume)
    window.addEventListener('pointercancel', resume)
    return () => {
      el.removeEventListener('pointerdown', pause)
      window.removeEventListener('pointerup', resume)
      window.removeEventListener('pointercancel', resume)
    }
  }, [reduced])

  const elapsed = useElapsedTime(active && !reduced, paused)
  const leaving = reduced ? false : elapsed >= leaveAt

  useEffect(() => {
    if (reduced) {
      if (active && !doneFiredRef.current) {
        doneFiredRef.current = true
        onDone?.()
      }
      return
    }
    if (!doneFiredRef.current && elapsed >= leaveAt + exitDuration) {
      doneFiredRef.current = true
      onDone?.()
    }
  }, [elapsed, active, reduced, onDone, leaveAt, exitDuration])

  return { sectionRef, paused, leaving, elapsed, reduced }
}
