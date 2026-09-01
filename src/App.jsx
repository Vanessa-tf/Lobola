import { useState } from 'react'
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
