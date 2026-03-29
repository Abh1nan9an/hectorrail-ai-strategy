import { useEffect } from 'react'
import { useInView } from '../hooks'
import { Zap, Target, ShieldOff, Map } from 'lucide-react'
import InteractionBar from '../components/InteractionBar'

const STATEMENTS = [
  {
    headline: 'AI is a condition to design\u00a0for.',
    body: 'Organisations that treat it as a toolbox of features to bolt on will fall permanently behind those that treat it as a design principle.',
    Icon: Zap
  },
  {
    headline: 'Most AI programmes optimise the\u00a0edge.',
    body: 'They automate tasks and add intelligence to existing workflows. Valuable — but very few ask the harder question: what would this process look like if designed\u00a0today?',
    Icon: Target
  },
  {
    headline: 'Not everything should be AI‑enabled.',
    body: 'Deciding what to accelerate, augment, or deliberately leave alone is itself a strategic act. Absence of AI in certain places is a design\u00a0choice.',
    Icon: ShieldOff
  },
  {
    headline: 'The gap is the\u00a0agenda.',
    body: 'Design this organisation from scratch with AI as a given — the distance between that vision and today\'s reality is your transformation\u00a0agenda.',
    Icon: Map
  },
]

export default function Reframe({ onEnterView }) {
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) onEnterView?.('reframe')
  }, [inView, onEnterView])

  return (
    <section id="reframe" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">02</div>
        <h2 className="section__heading">
          AI&#8209;native is an operating model question — <em>not a technology&nbsp;question.</em>
        </h2>

        <div className="section__body">
          <p>
            The strategic shift is not about which tools you adopt. It is about how you
            conceive of the organisation — its structure, its decision-making, its workflows —
            with AI as a permanent, foundational&nbsp;condition.
          </p>
        </div>

        <div className="reframe-statements">
          {STATEMENTS.map(({ headline, body, Icon }) => (
            <div className="reframe-card" key={headline}>
              <Icon size={22} strokeWidth={1.5} className="reframe-card__icon" />
              <p className="reframe-card__headline">{headline}</p>
              <p className="reframe-card__body">{body}</p>
            </div>
          ))}
        </div>

        <InteractionBar section="reframe" />
      </div>
    </section>
  )
}
