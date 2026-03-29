import { useEngagement } from '../context/EngagementContext'

const RESPONSES = [
  { id: 'spot-on',        label: 'Spot on' },
  { id: 'partially-true', label: 'Partially true' },
  { id: 'differently',    label: 'We see it differently' },
  { id: 'tell-more',      label: 'Tell us more' },
]

export default function HypothesisCard({ number, text, hypKey }) {
  const { state, setHypothesisResponse } = useEngagement()
  const response = state.hypotheses[hypKey]

  return (
    <div className={`hypothesis-card${response ? ' responded' : ''}`}>
      <div className="hypothesis-card__header">
        <div className="hypothesis-card__num">{number}</div>
        <p className="hypothesis-card__text">{text}</p>
      </div>
      <div className="hypothesis-card__responses">
        {RESPONSES.map(({ id, label }) => (
          <button
            key={id}
            className={`hypothesis-btn${response === id ? ' active' : ''}`}
            onClick={() => setHypothesisResponse(hypKey, id)}
            aria-pressed={response === id}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
