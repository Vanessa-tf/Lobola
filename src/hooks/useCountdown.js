import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function remaining(target) {
  const ms = target - Date.now()
  if (ms <= 0) return null
  return {
    days: Math.floor(ms / DAY),
    hours: Math.floor(ms / HOUR) % 24,
    minutes: Math.floor(ms / MINUTE) % 60,
    seconds: Math.floor(ms / SECOND) % 60
  }
}

/** Ticks once a second until the date passes, then returns null. */
export function useCountdown(isoDate) {
  const target = new Date(isoDate).getTime()
  const [left, setLeft] = useState(() => remaining(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(remaining(target)), SECOND)
    return () => clearInterval(id)
  }, [target])

  return left
}
