import { useState, useEffect, useCallback } from 'react'
import { EngagementProvider } from './context/EngagementContext'
import ProgressBar from './components/ProgressBar'
import Nav from './components/Nav'
import Cover from './sections/Cover'
import Position from './sections/Position'
import Backbone from './sections/Backbone'
import Stance from './sections/Stance'
import TimeLogic from './sections/TimeLogic'
import Hypotheses from './sections/Hypotheses'
import Invite from './sections/Invite'

const SECTION_IDS = ['cover', 'position', 'backbone', 'stance', 'timeLogic', 'hypotheses', 'invite']

function AppContent() {
  const [activeSection, setActiveSection] = useState('cover')

  // Track active section by scroll position
  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight * 0.45
      let current = 'cover'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= mid) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleEnterView = useCallback((id) => {
    // Sections notify when they enter view — used as secondary signal
    // The scroll handler is authoritative for nav, this is a no-op here
  }, [])

  return (
    <>
      <ProgressBar />
      <Nav activeSection={activeSection} />

      <header className="site-header">
        <a href="https://www.tarento.com" target="_blank" rel="noopener noreferrer" className="site-header__logo site-header__logo--tarento">
          <img src="https://d3e64cxw1rkxsu.cloudfront.net/Tarento_logo_efeb39d3b6.svg" alt="Tarento" />
        </a>
        <a href="https://www.hectorrail.com" target="_blank" rel="noopener noreferrer" className="site-header__logo site-header__logo--hector">
          <img src="https://www.hectorrail.com/wp-content/uploads/2022/04/logo-svart.svg" alt="Hector Rail" />
        </a>
      </header>

      <main>
        <Cover />
        <Position   onEnterView={handleEnterView} />
        <Backbone   onEnterView={handleEnterView} />
        <Stance     onEnterView={handleEnterView} />
        <TimeLogic  onEnterView={handleEnterView} />
        <Hypotheses onEnterView={handleEnterView} />
        <Invite     onEnterView={handleEnterView} />
      </main>
    </>
  )
}

export default function App() {
  return (
    <EngagementProvider>
      <AppContent />
    </EngagementProvider>
  )
}
