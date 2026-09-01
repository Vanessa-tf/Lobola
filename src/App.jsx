import { useEffect, useRef, useState } from 'react'
import SealGate from './components/SealGate.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import Hero from './components/Hero.jsx'
import Countdown from './components/Countdown.jsx'
import EventDetails from './components/EventDetails.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import RsvpForm from './components/RsvpForm.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import { music } from './data/wedding.js'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [revealing, setRevealing] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  const [detailsDone, setDetailsDone] = useState(false)
  const audioRef = useRef(null)

  // Starting playback here, inside the same click that opens the seal, is
  // what lets the browser allow audio with sound -- a deferred call (e.g.
  // from a later timeout) would get blocked by autoplay policy.
  function handleOpening() {
    setRevealing(true)
    audioRef.current?.play().catch(() => {})
  }

  // The title and details slides are full-screen and fit exactly -- lock
  // page scroll while either is showing so no scrollbar appears until
  // there's actually something to scroll (from the RSVP section on).
  useEffect(() => {
    document.body.style.overflow = detailsDone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [detailsDone])

  return (
    <>
      {!opened && <SealGate onOpening={handleOpening} onOpen={() => setOpened(true)} />}
      {music.src && (
        <>
          <audio ref={audioRef} src={music.src} loop preload="auto" />
          <MusicToggle audioRef={audioRef} visible={revealing} />
        </>
      )}
      <SiteHeader />
      {!titleDone && <Hero active={revealing} onDone={() => setTitleDone(true)} />}
      {!detailsDone && (
        <EventDetails active={titleDone} onDone={() => setDetailsDone(true)} />
      )}
      <RsvpForm />
      <Countdown />
      <SiteFooter />
    </>
  )
}
