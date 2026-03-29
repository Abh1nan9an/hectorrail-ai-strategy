import { useEffect } from 'react'
import { useInView } from '../hooks'
import { ShieldCheck } from 'lucide-react'
import InteractionBar from '../components/InteractionBar'

const HORIZONS = [
  {
    label: 'Horizon One',
    title: 'Now',
    desc: 'What can and should start immediately. Actions that generate momentum, require no major preconditions, and build the organisational muscle for what follows. The aim is not just quick wins — it is\u00a0credibility.'
  },
  {
    label: 'Horizon Two',
    title: 'Next',
    desc: 'What follows once momentum, clarity, or enabling conditions are in place. These often depend on something from the \u201cNow\u201d horizon being in place first — data infrastructure, capability, or organisational\u00a0confidence.'
  },
  {
    label: 'Horizon Three',
    title: 'Later',
    desc: 'What matters, but only after deeper changes or greater maturity. \u201cLater\u201d is not a dumping ground for the difficult. It is a deliberate choice about sequencing — what cannot yet be done well, and what the preconditions\u00a0are.'
  },
]

const NEVER_ITEMS = [
  'Decisions where human judgement, accountability, or relationship is the\u00a0point',
  'Areas where AI-error consequences are irreversible or safety-critical',
  'Processes where the act of human deliberation is itself strategically\u00a0valuable',
  'Functions where trust is the product — and automation would destroy\u00a0it',
  'Anything technically feasible but strategically unwise at this\u00a0stage',
]

export default function TimeLogic({ onEnterView }) {
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) onEnterView?.('timeLogic')
  }, [inView, onEnterView])

  return (
    <section id="timeLogic" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">04</div>
        <h2 className="section__heading">
          Sequence matters <em>as much as&nbsp;direction.</em>
        </h2>

        <p className="timelogic-intro">
          "Enable" doesn't always mean "now." "Engineer" doesn't always mean "later."
          The intervention type and the timing are separate strategic choices. Conflating
          them is one of the most common ways organisations misallocate energy
          and lose&nbsp;credibility.
        </p>

        <div className="timelogic-grid">
          {HORIZONS.map(({ label, title, desc }) => (
            <div className="timelogic-cell" key={title}>
              <div className="timelogic-cell__label">{label}</div>
              <div className="timelogic-cell__title">{title}</div>
              <p className="timelogic-cell__desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="timelogic-never">
          <div className="timelogic-never__header">
            <ShieldCheck size={20} strokeWidth={1.5} className="timelogic-never__icon" />
            <div className="timelogic-never__title">
              Boundary condition — what should never be&nbsp;automated
            </div>
          </div>
          <p className="timelogic-never__desc">
            The most mature strategic signal in any AI programme is knowing what should
            not be handed to AI — not because it can't be, but because doing so would
            undermine something more&nbsp;valuable.
          </p>
          <div className="timelogic-never__items">
            {NEVER_ITEMS.map(item => (
              <div className="timelogic-never__item" key={item}>{item}</div>
            ))}
          </div>
        </div>

        <InteractionBar section="timeLogic" />
      </div>
    </section>
  )
}
