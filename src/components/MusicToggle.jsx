import { useEffect, useState } from 'react'
import styles from './MusicToggle.module.css'

/** Small persistent control for the background track. Reflects and drives the shared <audio> element. */
export default function MusicToggle({ audioRef, visible }) {
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [audioRef])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  if (!visible) return null

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
        {playing ? (
          <g className={styles.waves} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M16.2 8.8a5 5 0 0 1 0 6.4" />
            <path d="M18.6 6.4a8.5 8.5 0 0 1 0 11.2" />
          </g>
        ) : (
          <path d="M15.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        )}
      </svg>
    </button>
  )
}
