import { couple } from '../data/wedding.js'
import styles from './SiteFooter.module.css'

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={`display ${styles.names}`}>{couple.shortNames}</p>
      <hr className="rule" />
      <p className={styles.families}>Chaibva &middot; Fambarega</p>
      <p className={styles.thanks}>We give thanks</p>
    </footer>
  )
}
