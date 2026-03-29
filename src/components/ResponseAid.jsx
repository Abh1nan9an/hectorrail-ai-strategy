import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Mic, MicOff, ArrowRight, ChevronDown } from 'lucide-react'
import RESPONSE_PROMPTS from '../data/responsePrompts'

/**
 * ResponseAid — guided response panel.
 *
 * Props:
 *  section        — key into RESPONSE_PROMPTS (e.g. 'position', 'backbone')
 *  open           — boolean controlling visibility
 *  onClose        — callback to close the panel
 *  onInsertText   — (text: string) => void — appends text to the section textarea
 */
export default function ResponseAid({ section, open, onClose, onInsertText }) {
  const prompts = RESPONSE_PROMPTS[section]
  const [showMore, setShowMore] = useState(false)
  const [recordingIdx, setRecordingIdx] = useState(null) // 'u0','u1','s0',...
  const recognitionRef = useRef(null)
  const panelRef = useRef(null)

  // Reset "show more" when section changes
  useEffect(() => {
    setShowMore(false)
    setRecordingIdx(null)
  }, [section])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setRecordingIdx(null)
  }, [])

  const startRecording = useCallback((idx) => {
    // Stop any existing recording first
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
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

    let finalTranscript = ''

    recognition.onresult = (event) => {
      let interim = ''
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interim += event.results[i][0].transcript
        }
      }
    }

    recognition.onerror = () => {
      setRecordingIdx(null)
    }

    recognition.onend = () => {
      if (finalTranscript.trim()) {
        onInsertText(finalTranscript.trim())
      }
      setRecordingIdx(null)
      recognitionRef.current = null
    }

    recognitionRef.current = recognition
    recognition.start()
    setRecordingIdx(idx)
  }, [onInsertText])

  const toggleRecording = useCallback((idx) => {
    if (recordingIdx === idx) {
      stopRecording()
    } else {
      startRecording(idx)
    }
  }, [recordingIdx, stopRecording, startRecording])

  const usePrompt = useCallback((promptText) => {
    // Strip non-breaking spaces for the inserted text
    const clean = promptText.replace(/\u00a0/g, ' ')
    onInsertText(clean)
  }, [onInsertText])

  if (!prompts) return null

  const visibleSpecific = showMore ? prompts.specific : prompts.specific.slice(0, 3)
  const hasMore = prompts.specific.length > 3

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`response-aid-backdrop${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`response-aid${open ? ' open' : ''}`}
        role="dialog"
        aria-label="Help me respond"
        aria-modal="false"
      >
        <div className="response-aid__header">
          <div>
            <h3 className="response-aid__title">Help me respond</h3>
            <p className="response-aid__subtitle">
              Use these prompts to react, challenge, refine, or build on the thinking in this&nbsp;section.
            </p>
          </div>
          <button className="response-aid__close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="response-aid__body">
          {/* Universal prompts */}
          <div className="response-aid__group">
            <div className="response-aid__group-label">Universal prompts</div>
            <p className="response-aid__group-hint">
              Helpful no matter where you want to&nbsp;start.
            </p>
            <div className="response-aid__prompts">
              {prompts.universal.map((p, i) => {
                const idx = `u${i}`
                const isRec = recordingIdx === idx
                return (
                  <PromptItem
                    key={idx}
                    text={p}
                    isRecording={isRec}
                    onSpeak={() => toggleRecording(idx)}
                    onUse={() => usePrompt(p)}
                  />
                )
              })}
            </div>
          </div>

          {/* Section-specific prompts */}
          <div className="response-aid__group">
            <div className="response-aid__group-label">
              {prompts.label} prompts
            </div>
            <p className="response-aid__group-hint">
              Tailored to the content you're responding to right&nbsp;now.
            </p>
            <div className="response-aid__prompts">
              {visibleSpecific.map((p, i) => {
                const idx = `s${i}`
                const isRec = recordingIdx === idx
                return (
                  <PromptItem
                    key={idx}
                    text={p}
                    isRecording={isRec}
                    onSpeak={() => toggleRecording(idx)}
                    onUse={() => usePrompt(p)}
                  />
                )
              })}
            </div>
            {hasMore && !showMore && (
              <button
                className="response-aid__show-more"
                onClick={() => setShowMore(true)}
              >
                <ChevronDown size={14} strokeWidth={1.5} />
                Show more prompts
              </button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

/* ─── Prompt Item sub-component ─────────────────────────────────── */
function PromptItem({ text, isRecording, onSpeak, onUse }) {
  return (
    <div className="response-aid__prompt">
      <p className="response-aid__prompt-text">{text}</p>
      <div className="response-aid__prompt-actions">
        <button
          className={`response-aid__prompt-btn${isRecording ? ' recording' : ''}`}
          onClick={onSpeak}
          title={isRecording ? 'Stop recording' : 'Speak your response'}
        >
          {isRecording ? <MicOff size={13} /> : <Mic size={13} />}
          <span>{isRecording ? 'Stop' : 'Speak'}</span>
        </button>
        <button
          className="response-aid__prompt-btn response-aid__prompt-btn--use"
          onClick={onUse}
          title="Insert this prompt as a starter"
        >
          <ArrowRight size={13} />
          <span>Use this</span>
        </button>
      </div>
    </div>
  )
}
