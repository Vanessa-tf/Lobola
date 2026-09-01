import { calendar, ceremony } from '../data/wedding.js'
import styles from './CalendarStrip.module.css'

/**
 * One week of December with the wedding day ringed by a dotted heart.
 * Rendered as a table because it is one: weekday headers, dates beneath.
 */
export default function CalendarStrip() {
  return (
    <table className={styles.calendar}>
      <caption className={styles.month}>{calendar.month}</caption>
      <thead>
        <tr>
          {calendar.weekdays.map((day) => (
            <th key={day} scope="col">{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {calendar.dates.map((date) => {
            const isDay = date === calendar.highlighted
            return (
              <td key={date} data-wedding-day={isDay || undefined}>
                {isDay ? <time dateTime={ceremony.startsAt.slice(0, 10)}>{date}</time> : date}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
