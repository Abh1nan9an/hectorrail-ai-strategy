import { Download } from 'lucide-react'
import { useEngagement } from '../context/EngagementContext'

const SECTIONS = [
  { id: 'position',   label: 'Position', num: '01' },
  { id: 'backbone',   label: 'Architecture', num: '02' },
  { id: 'stance',     label: 'Stance', num: '03' },
  { id: 'timeLogic',  label: 'Time Logic', num: '04' },
  { id: 'hypotheses', label: 'Hypotheses', num: '05' },
  { id: 'listen',     label: 'Listen', num: '06' },
  { id: 'invite',     label: 'Join Forces', num: '07' },
]

export default function Nav({ activeSection }) {
  const { exportEngagement } = useEngagement()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="side-nav" aria-label="Section navigation">
      <ul className="side-nav__list">
        {SECTIONS.map(({ id, label, num }) => {
          const isActive = activeSection === id
          return (
            <li key={id}>
              <button
                className={`side-nav__item${isActive ? ' active' : ''}`}
                onClick={() => scrollTo(id)}
                aria-label={`Navigate to ${label}`}
              >
                <span className="side-nav__num">{num}</span>
                <span className="side-nav__label">{label}</span>
              </button>
            </li>
          )
        })}
        <li>
          <button
            className="side-nav__item side-nav__item--export"
            onClick={exportEngagement}
            aria-label="Export your engagement as JSON"
          >
            <Download size={13} strokeWidth={2} />
            <span className="side-nav__label">Export Your Engagement</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
