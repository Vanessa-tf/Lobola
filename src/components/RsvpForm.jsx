import { useState } from 'react'
import { rsvp } from '../data/wedding.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './RsvpForm.module.css'

const FORM_NAME = 'rsvp'

export default function RsvpForm() {
  const [ref, shown] = useReveal()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [accepted, setAccepted] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')

    const body = new URLSearchParams(new FormData(event.target))
    body.set('form-name', FORM_NAME)

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      })
      setStatus(response.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section ref={ref} className={styles.rsvp} aria-labelledby="rsvp-heading">
        <h2 id="rsvp-heading" className={`display ${styles.heading}`}>Thank you</h2>
        <p className={styles.confirmation}>
          Your reply is in. We will be in touch closer to the day.
        </p>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className={`reveal ${styles.rsvp}`}
      data-shown={shown}
      aria-labelledby="rsvp-heading"
      id="rsvp"
    >
      <p className="eyebrow">Kindly reply by {rsvp.deadline}</p>
      <hr className="rule" />
      <h2 id="rsvp-heading" className={`display ${styles.heading}`}>Confirm your attendance</h2>

      <form className={styles.form} name={FORM_NAME} method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input type="text" name="bot-field" className={styles.honeypot} tabIndex={-1} autoComplete="off" />

        <p className={styles.field}>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </p>

        <p className={styles.field}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </p>

        <fieldset className={styles.choice}>
          <legend>Will you attend?</legend>
          {rsvp.attendance.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="attending"
                value={option.value}
                required
                onChange={() => setAccepted(!option.declines)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>

        {accepted && (
          <>
            <p className={styles.split}>
              <label htmlFor="guests">Number of guests</label>
              <input id="guests" name="guests" type="number" min="1" max="10" defaultValue="1" />
              <label htmlFor="diet">Dietary needs</label>
              <select id="diet" name="diet">
                {rsvp.dietOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </p>

            <p className={styles.field}>
              <label htmlFor="message">Dietary details or other questions</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Especially if you chose &ldquo;Other&rdquo; above"
              />
            </p>
          </>
        )}

        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send confirmation'}
        </button>

        {status === 'error' && (
          <p className={styles.error} role="alert">
            That did not send. Check your connection and try again, or call {rsvp.contactName} on{' '}
            {rsvp.contactPhone}.
          </p>
        )}
      </form>

      <p className={styles.alternative}>Prefer to reply by phone?</p>
      <a className={styles.contactLink} href={`tel:${rsvp.contactPhone.replace(/\s/g, '')}`}>
        <svg
          className={styles.contactIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 8.3 8.3 0 0 0 2.6.42 1 1 0 0 1 1 1V19.5a1 1 0 0 1-1 1A15.5 15.5 0 0 1 3.5 5a1 1 0 0 1 1-1H7.6a1 1 0 0 1 1 1 8.3 8.3 0 0 0 .42 2.6 1 1 0 0 1-.25 1z"
          />
        </svg>
        <span>
          {rsvp.contactName} &middot; {rsvp.contactPhone}
        </span>
      </a>
    </section>
  )
}
