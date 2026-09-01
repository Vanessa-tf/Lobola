import { useEffect, useRef, useState } from 'react'

/**
 * Types out multiple text segments one after another -- each segment only
 * starts once the previous one has fully typed. Returns the array of
 * currently-revealed substrings, same length/order as `segments`.
 *
 * Pauses cleanly while `paused` is true (freezes mid-character) and picks
 * back up from the same spot once unpaused.
 */
export function useTypedSequence(segments, { enabled = true, paused = false, gap = 250 } = {}) {
  const [revealed, setRevealed] = useState(() => segments.map(() => ''))
  const elapsedRef = useRef(0)
  const lastTsRef = useRef(null)
  const rafRef = useRef()

  useEffect(() => {
    if (!enabled) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRevealed(segments.map((seg) => seg.text))
      return
    }

    const cumulative = []
    let acc = 0
    for (const seg of segments) {
      cumulative.push({ seg, start: acc })
      acc += seg.text.length * seg.speed + gap
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
        elapsedRef.current += delta
        setRevealed(
          cumulative.map(({ seg, start }) => {
            const local = elapsedRef.current - start
            if (local <= 0) return ''
            const chars = Math.min(seg.text.length, Math.floor(local / seg.speed))
            return seg.text.slice(0, chars)
          })
        )
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, paused])

  return revealed
}
