import { ceremony, venue } from '../data/wedding.js'
import { useSlideAdvance } from '../hooks/useSlideAdvance.js'
import CalendarStrip from './CalendarStrip.jsx'
import styles from './EventDetails.module.css'

// Milliseconds of active (unpaused) reading time before this slide dissolves
// into the RSVP slide. Holding a finger/click down pauses the clock.
const LEAVE_AT = 7000
const EXIT_DURATION = 900

export default function EventDetails({ active = true, onDone }) {
  const { sectionRef, paused, leaving } = useSlideAdvance({
    active,
    leaveAt: LEAVE_AT,
    exitDuration: EXIT_DURATION,
    onDone,
  })

  return (
    <section
      ref={sectionRef}
      className={styles.details}
      data-leaving={leaving}
      data-paused={paused}
      aria-labelledby="details-heading"
    >
      <div className={styles.card}>
        <h2 id="details-heading" className="eyebrow">Where and when</h2>
        <hr className="rule" />

        <CalendarStrip />

        <hr className="rule" />

        <dl className={styles.pair}>
          <dt className={`display ${styles.term}`}>Time</dt>
          <dd className={styles.value}>{ceremony.timeLabel}</dd>
          <dt className={`display ${styles.term}`}>Dress Code</dt>
          <dd className={styles.value}>{ceremony.dressCode}</dd>
        </dl>

        <hr className="rule" />

        <h3 className={`display ${styles.venueHeading}`}>Venue</h3>
        <address className={styles.address}>
          {venue.name}
          <br />
          {venue.street}
          <br />
          {venue.city}
        </address>

        <a className={styles.mapLink} href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
          Open in Maps
        </a>
      </div>
    </section>
  )
}
