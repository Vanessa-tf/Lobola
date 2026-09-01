import { useEffect, useRef, useState } from 'react'
import styles from './SealGate.module.css'

/** Full-screen wax seal. Tapping it reveals the invitation. */
export default function SealGate({ onOpening, onOpen }) {
  const [leaving, setLeaving] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  function open() {
    setLeaving(true)
    onOpening?.()
    setTimeout(onOpen, 1150)
  }

  return (
    <aside className={styles.gate} data-leaving={leaving} aria-label="Invitation cover">
      <div className={styles.card}>
        <div className={styles.envelopeWrap}>
          <img className={styles.envelopeImg} src="/images/envelope-trimmed.jpg" alt="" aria-hidden="true" />
          <img className={styles.flapImg} src="/images/envelope-trimmed.jpg" alt="" aria-hidden="true" />
          <p className={styles.names} aria-hidden="true">You&rsquo;ve Got Mail</p>
          <button ref={buttonRef} type="button" className={styles.wax} onClick={open}>
            <img className={styles.sealImg} src="/images/wax-seal-lr-brown.png" alt="" aria-hidden="true" />
            <span className={styles.label}>Open the invitation</span>
          </button>
        </div>
      </div>
      <p className={styles.hint} aria-hidden="true">Tap to open</p>
    </aside>
  )
}
