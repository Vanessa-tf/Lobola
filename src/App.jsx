import { useEffect, useState } from 'react'
import SealGate from './components/SealGate.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import Hero from './components/Hero.jsx'
import Countdown from './components/Countdown.jsx'
import EventDetails from './components/EventDetails.jsx'
import RsvpForm from './components/RsvpForm.jsx'
import SiteFooter from './components/SiteFooter.jsx'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [revealing, setRevealing] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  const [detailsDone, setDetailsDone] = useState(false)

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
      {!opened && (
        <SealGate onOpening={() => setRevealing(true)} onOpen={() => setOpened(true)} />
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
