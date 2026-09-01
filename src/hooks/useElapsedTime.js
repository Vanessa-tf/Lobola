import { useEffect, useRef, useState } from 'react'

/**
 * Milliseconds of "active" time elapsed since `active` became true.
 * Freezes (stops accumulating) while `paused` is true, and resumes
 * from where it left off once `paused` goes false again.
 */
export function useElapsedTime(active, paused) {
  const [elapsed, setElapsed] = useState(0)
  const rafRef = useRef()
  const lastTsRef = useRef(null)

  useEffect(() => {
    if (!active) {
      setElapsed(0)
      lastTsRef.current = null
      return
    }

    // Every fresh run of this effect (including a paused<->running toggle)
    // must not compare against a timestamp from before the restart, or the
    // very next frame's delta would include the entire paused duration.
    lastTsRef.current = null

    function tick(ts) {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const delta = ts - lastTsRef.current
      lastTsRef.current = ts
      if (!paused) {
        setElapsed((e) => e + delta)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, paused])

  return elapsed
}
