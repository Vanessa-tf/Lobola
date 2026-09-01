import { useEffect, useState } from 'react'
import { couple } from '../data/wedding.js'
import styles from './SiteHeader.module.css'

/** Sticky name bar. Appears once the hero has scrolled away. */
export default function SiteHeader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 420)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={styles.bar} data-visible={visible}>
      <img className={styles.logo} src="/images/logo-mark.png" alt="" aria-hidden="true" />
      <p className="display">{couple.shortNames}</p>
    </header>
  )
}
