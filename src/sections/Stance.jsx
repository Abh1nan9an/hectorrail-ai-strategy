import { useEffect } from 'react'
import { useInView } from '../hooks'
import InteractionBar from '../components/InteractionBar'

const STANCES = [
  {
    label: 'Stance One',
    title: 'Enable',
    desc: 'Use what already exists in the current landscape to unlock value fast. Activate capabilities already available in the tools you have. Low-regret, high-adoption, early\u00a0momentum.',
    principle: 'Speed matters. Getting things moving early creates organisational confidence and funds the harder work that\u00a0follows.'
  },
  {
    label: 'Stance Two',
    title: 'Extend',
    desc: 'Add targeted layers — integrations, copilots, intelligence feeds, workflow support — that stretch the current landscape meaningfully without rebuilding it. Targeted uplift on what\u00a0works.',
    principle: 'Not everything that needs improving needs replacing. Extension is the discipline of knowing the\u00a0difference.'
  },
  {
    label: 'Stance Three',
    title: 'Engineer',
    desc: 'Redesign or build what is fundamentally required for durable advantage. Deeper, more custom, more structural. This is where the long-term competitive positions are\u00a0created.',
    principle: 'Some things can only be achieved by building differently. The question is knowing which things — and being honest about the investment\u00a0required.'
  },
]

export default function Stance({ onEnterView }) {
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) onEnterView?.('stance')
  }, [inView, onEnterView])

  return (
    <section id="stance" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">03</div>
        <h2 className="section__heading">
          Not everything needs to be rebuilt — <em>but everything needs a deliberate&nbsp;stance.</em>
        </h2>

        <p className="stance-intro">
          Most organisations default to rebuilding everything or changing
          nothing. The real discipline is applying the right intervention to each dimension:
          some things need to be enabled, some extended, some fundamentally engineered.
          Choosing wrongly is expensive in either&nbsp;direction.
        </p>

        <div className="stance-cards">
          {STANCES.map(({ label, title, desc, principle }) => (
            <div className="stance-card" key={title}>
              <div className="stance-card__label">{label}</div>
              <div className="stance-card__title">{title}</div>
              <p className="stance-card__desc">{desc}</p>
              <p className="stance-card__principle">{principle}</p>
            </div>
          ))}
        </div>

        <InteractionBar section="stance" />
      </div>
    </section>
  )
}
