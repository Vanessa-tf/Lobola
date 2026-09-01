import { ceremony } from '../data/wedding.js'
import { useCountdown } from '../hooks/useCountdown.js'
import styles from './Countdown.module.css'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown() {
  const left = useCountdown(ceremony.startsAt)

  return (
    <section className={styles.countdown} aria-labelledby="countdown-heading">
      <h2 id="countdown-heading" className="eyebrow">
        {left ? 'Counting down to the day' : 'The day is here'}
      </h2>

      {left ? (
        <dl className={styles.clock}>
          <dt className={styles.term}>Days</dt>
          <dd className={styles.value}>{left.days}</dd>
          <dt className={styles.term}>Hours</dt>
          <dd className={styles.value}>{pad(left.hours)}</dd>
          <dt className={styles.term}>Minutes</dt>
          <dd className={styles.value}>{pad(left.minutes)}</dd>
          <dt className={styles.term}>Seconds</dt>
          <dd className={styles.value}>{pad(left.seconds)}</dd>
        </dl>
      ) : (
        <p className={styles.married}>We are married</p>
      )}
    </section>
  )
}
