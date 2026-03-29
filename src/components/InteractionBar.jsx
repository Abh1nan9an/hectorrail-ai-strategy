import { useState, useRef, useCallback } from 'react'
import { useEngagement } from '../context/EngagementContext'
import { Sparkles, MessageCircle, Lightbulb, Flag, Mic, MicOff, BookOpen } from 'lucide-react'
import ResponseAid from './ResponseAid'

const REACTIONS = [
  { id: 'resonates', label: 'This resonates', Icon: Sparkles },
  { id: 'discuss',   label: 'Want to discuss', Icon: MessageCircle },
  { id: 'thoughts',  label: 'We have thoughts', Icon: Lightbulb },
  { id: 'priority',  label: 'High priority', Icon: Flag },
]

export default function InteractionBar({ section, dark = false }) {
  const { state, toggleReaction, setAnnotation } = useEngagement()
  const [annotationOpen, setAnnotationOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [aidOpen, setAidOpen] = useState(false)
  const recognitionRef = useRef(null)
  const sectionState = state[section]

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
      const existing = sectionState.annotation || ''
      const base = existing.replace(/\n\[listening\.\.\.\]$/, '')
      setAnnotation(section, base + (base ? ' ' : '') + transcript)
    }

    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)

    if (!annotationOpen) setAnnotationOpen(true)
  }, [isRecording, section, sectionState.annotation, setAnnotation, annotationOpen])

  /* Insert text from ResponseAid into the textarea */
  const handleInsertText = useCallback((text) => {
    const existing = sectionState.annotation || ''
    setAnnotation(section, existing + (existing ? '\n' : '') + text + ' ')
    if (!annotationOpen) setAnnotationOpen(true)
  }, [section, sectionState.annotation, setAnnotation, annotationOpen])

  return (
    <div className={`interaction-bar${dark ? ' interaction-bar--dark' : ''}`}>
      <div className="interaction-bar__label">Think alongside us</div>
      <div className="interaction-bar__reactions">
        {REACTIONS.map(({ id, label, Icon }) => {
          const active = sectionState.reactions.includes(id)
          return (
            <button
              key={id}
              className={`reaction-btn${active ? ' active' : ''}`}
              onClick={() => toggleReaction(section, id)}
              aria-pressed={active}
            >
              <Icon size={15} strokeWidth={active ? 2 : 1.5} className="reaction-btn__icon" />
              {label}
            </button>
          )
        })}
      </div>

      <div className="interaction-bar__annotation">
        {!annotationOpen && !sectionState.annotation ? (
          <button
            className="annotation-toggle"
            onClick={() => setAnnotationOpen(true)}
          >
            + Share your thoughts
          </button>
        ) : (
          <div className="annotation-wrapper">
            <textarea
              className="annotation-field"
              placeholder="What does this surface for you? Where would you push back? What's missing?"
              value={sectionState.annotation}
              onChange={e => setAnnotation(section, e.target.value)}
              rows={5}
              autoFocus={annotationOpen && !sectionState.annotation}
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
        )}
      </div>

      <ResponseAid
        section={section}
        open={aidOpen}
        onClose={() => setAidOpen(false)}
        onInsertText={handleInsertText}
      />
    </div>
  )
}
