import { useEffect } from 'react'
import { useInView } from '../hooks'
import { Layers, Compass } from 'lucide-react'
import InteractionBar from '../components/InteractionBar'

export default function Position({ onEnterView }) {
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) onEnterView?.('position')
  }, [inView, onEnterView])

  return (
    <section id="position" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">01 — Position</div>

        <h2 className="section__heading">
          How would Hector Rail operate differently if AI were native to how&nbsp;it&nbsp;works?
        </h2>

        {/* Primary block first — Designing for AI */}
        <div className="position__panels">
          <div className="position__panel position__panel--design">
            <div className="position__panel-header">
              <Compass size={26} strokeWidth={1.5} className="position__panel-icon" />
              <div className="position__panel-badge">Our core perspective</div>
            </div>
            <div className="position__panel-label">Designing for&nbsp;AI</div>
            <p>If AI is a given — as available as electricity or the internet — what would this organisation look like if we designed it from&nbsp;scratch?</p>
          </div>

          <div className="position__panel position__panel--add">
            <div className="position__panel-header">
              <Layers size={24} strokeWidth={1.5} className="position__panel-icon" />
              <div className="position__panel-badge position__panel-badge--muted">Where most organisations start</div>
            </div>
            <div className="position__panel-label">Adding AI</div>
            <p>Keep your current operating model and look for places where AI can improve it. Valuable — but not the primary lens we&nbsp;bring&nbsp;here.</p>
          </div>
        </div>

        {/* Summary */}
        <div className="position__summary">
          <p>We understand no enterprise can start from scratch. We use this as our primary lens — asking <strong>"what would we redesign if&nbsp;we&nbsp;could?"</strong> — to surface the gap between where things are today and where the real value&nbsp;sits.</p>
        </div>

        <InteractionBar section="position" />
      </div>
    </section>
  )
}
