import { blooms, couple } from '../data/wedding.js'
import { useSlideAdvance } from '../hooks/useSlideAdvance.js'
import { useTypedSequence } from '../hooks/useTypedSequence.js'
import styles from './Hero.module.css'

const INVITATION_LINE = `${couple.families} request the pleasure of your company at the ${couple.occasion} of`

// All timings below are milliseconds of elapsed *active* (unpaused) time
// since the seal was tapped -- holding a finger/click down freezes this
// clock, same as pausing a WhatsApp status.
const NAMES_START = 2200

const NAME_SEGMENTS = [
  { text: couple.bride, speed: 95 },
  { text: '&', speed: 95 },
  { text: couple.groom, speed: 95 },
]
const SEGMENT_GAP = 250
const TYPING_DURATION = NAME_SEGMENTS.reduce((sum, seg) => sum + seg.text.length * seg.speed, 0) +
  (NAME_SEGMENTS.length - 1) * SEGMENT_GAP

// Once the names finish typing, sit with them a moment before dissolving away.
const ADVANCE_PAUSE = 1400
const LEAVE_AT = NAMES_START + TYPING_DURATION + ADVANCE_PAUSE
const EXIT_DURATION = 900

/** Full-screen title slide. Dissolves away to reveal the details slide once the names finish typing. */
export default function Hero({ active = true, onDone }) {
  const { sectionRef, paused, leaving, elapsed, reduced } = useSlideAdvance({
    active,
    leaveAt: LEAVE_AT,
    exitDuration: EXIT_DURATION,
    onDone,
  })

  const namesActive = reduced ? active : elapsed >= NAMES_START
  const [bride, amp, groom] = useTypedSequence(NAME_SEGMENTS, { enabled: namesActive, paused })
  const namesDone = groom === couple.groom

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      data-leaving={leaving}
      data-paused={paused}
      aria-labelledby="couple"
    >
      <div className={styles.card}>
        {blooms.topLeft && (
          <img className={styles.topLeft} src={blooms.topLeft} alt="" aria-hidden="true" />
        )}
        {blooms.bottomRight && (
          <img className={styles.bottomRight} src={blooms.bottomRight} alt="" aria-hidden="true" />
        )}

        <p className={`eyebrow ${styles.invitation}`} data-active={active}>
          {INVITATION_LINE}
        </p>

        <h1 id="couple" className={`display ${styles.names}`}>
          <span className={styles.srOnly}>
            {couple.bride} &amp; {couple.groom}
          </span>
          <span aria-hidden="true">
            {bride}
            <small className={styles.amp}>{amp}</small>
            {groom}
            {!namesDone && <span className={styles.caret} />}
          </span>
        </h1>
      </div>
    </section>
  )
}
