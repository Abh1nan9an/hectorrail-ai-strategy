import { useEngagement } from '../context/EngagementContext'

export default function ProgressBar() {
  const { computeProgress } = useEngagement()
  const progress = computeProgress()

  return (
    <div className="progress-bar" title={`Engagement: ${progress}%`}>
      <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
      <span className="progress-bar__label">{progress}% engaged</span>
    </div>
  )
}
