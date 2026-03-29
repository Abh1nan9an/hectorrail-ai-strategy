import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from '../hooks'
import { Mic, MicOff, BookOpen } from 'lucide-react'
import HypothesisCard from '../components/HypothesisCard'
import ResponseAid from '../components/ResponseAid'
import { useEngagement } from '../context/EngagementContext'

const HYPOTHESES = [
  {
    key: 'h1',
    num: '01',
    text: 'Real-time network intelligence could shift competitive position from \u201creliable operator\u201d to \u201cpredictive logistics partner\u201d — changing the nature of customer commitments possible, and the margins that accompany\u00a0them.'
  },
  {
    key: 'h2',
    num: '02',
    text: 'The highest-value AI opportunity may not be in operations — where incremental optimisation has diminishing returns — but in commercial decision-making: dynamic pricing, capacity allocation, and customer\u00a0intelligence.'
  },
  {
    key: 'h3',
    num: '03',
    text: 'Decades of operational experience, route expertise, and regulatory understanding represent a strategic asset that is currently invisible, unstructured, and at genuine risk of being lost. That knowledge is the difference between AI that is generically capable and AI that actually knows your\u00a0business.'
  },
  {
    key: 'h4',
    num: '04',
    text: 'The biggest barrier to becoming AI-native is not technology or data readiness. It is the current decision architecture — where decisions follow hierarchy and experience rather than the best available combination of human judgement and machine\u00a0intelligence.'
  },
  {
    key: 'h5',
    num: '05',
    text: 'Some critical areas — safety decisions, certain regulatory processes, key customer relationships — should remain firmly human-led, regardless of what AI could technically do. Defining those boundaries with clarity is as strategically important as identifying where AI should\u00a0enter.'
  },
]

export default function Hypotheses({ onEnterView }) {
  const [ref, inView] = useInView()
  const { state, setHypothesisAnnotation } = useEngagement()
  const [isRecording, setIsRecording] = useState(false)
  const [aidOpen, setAidOpen] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (inView) onEnterView?.('hypotheses')
  }, [inView, onEnterView])

  const toggleRecording = useCallback(() => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please try Chrome.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      const existing = state.hypotheses.annotation || ''
      setHypothesisAnnotation(existing + (existing ? ' ' : '') + transcript)
    }
    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [isRecording, state.hypotheses.annotation, setHypothesisAnnotation])

  const handleInsertText = useCallback((text) => {
    const existing = state.hypotheses.annotation || ''
    setHypothesisAnnotation(existing + (existing ? '\n' : '') + text + ' ')
  }, [state.hypotheses.annotation, setHypothesisAnnotation])

  return (
    <section id="hypotheses" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">05</div>
        <h2 className="section__heading">
          Five working hypotheses — <em>provocations to test, not&nbsp;conclusions.</em>
        </h2>

        <p className="hypotheses-intro">
          These are our current best guesses about where the greatest opportunity and
          greatest risk lies for Hector Rail. We hold them with confidence and open hands.
          Tell us where we're right, where we're wrong, and where your thinking has
          already gone&nbsp;further.
        </p>

        <div className="hypothesis-list">
          {HYPOTHESES.map(h => (
            <HypothesisCard
              key={h.key}
              number={h.num}
              text={h.text}
              hypKey={h.key}
            />
          ))}
        </div>

        <div className="hypotheses-annotation">
          <div className="hypotheses-annotation__label">Your overall response</div>
          <div className="annotation-wrapper">
            <textarea
              className="annotation-field"
              placeholder="What do these hypotheses surface? Which would you prioritise? What's missing from this list?"
              value={state.hypotheses.annotation}
              onChange={e => setHypothesisAnnotation(e.target.value)}
              rows={4}
            />
            <div className="annotation-tools">
              <button
                className={`annotation-tool${isRecording ? ' recording' : ''}`}
                onClick={toggleRecording}
                title={isRecording ? 'Stop recording' : 'Speak your thoughts'}
                aria-label={isRecording ? 'Stop recording' : 'Speak your thoughts'}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{isRecording ? 'Stop' : 'Speak'}</span>
              </button>
              <button
                className={`annotation-tool${aidOpen ? ' active' : ''}`}
                onClick={() => setAidOpen(!aidOpen)}
                title="Help me respond"
                aria-label="Open response aid"
              >
                <BookOpen size={16} />
                <span>Help me respond</span>
              </button>
            </div>
          </div>
        </div>

        <ResponseAid
          section="hypotheses"
          open={aidOpen}
          onClose={() => setAidOpen(false)}
          onInsertText={handleInsertText}
        />
      </div>
    </section>
  )
}
