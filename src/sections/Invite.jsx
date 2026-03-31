import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from '../hooks'
import { Mic, MicOff, Lock } from 'lucide-react'
import { useEngagement } from '../context/EngagementContext'
import PrivacyPanel from '../components/PrivacyPanel'

export default function Invite({ onEnterView }) {
  const [ref, inView] = useInView()
  const { state, setInviteField, exportEngagement } = useEngagement()
  const [isRecording, setIsRecording] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (inView) onEnterView?.('invite')
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
      const existing = state.invite.annotation || ''
      setInviteField('annotation', existing + (existing ? ' ' : '') + transcript)
    }
    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [isRecording, state.invite.annotation, setInviteField])

  return (
    <section id="invite" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">06</div>
        <h2 className="section__heading">
          We've started thinking — <em>your turn to help us sharpen&nbsp;this.</em>
        </h2>

        <div className="invite-content">
          <div className="invite-statement">
            <p>
              This is a point of view, not a proposal. We share it because the thinking
              is worth sharing — and because the conversation it starts is more valuable
              than any&nbsp;document.
            </p>
            <p>
              We'd like to know where this resonates, where you'd push back, and where
              your own thinking has already gone further. <em>That conversation is the
              starting point for everything&nbsp;that&nbsp;follows.</em>
            </p>
            <p>
              The intellectual architecture here becomes the backbone of an engagement
              designed to produce a genuine AI-native strategy for Hector Rail —
              not a list of use cases, not a technology roadmap, but a clear answer
              to the question that&nbsp;actually&nbsp;matters.
            </p>
          </div>

          <div className="invite-form">
            <label className="invite-form__label" htmlFor="invite-thoughts">
              Closing thoughts <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span>
            </label>
            <div className="invite-form__textarea-wrapper">
              <textarea
                id="invite-thoughts"
                className="invite-form__textarea"
                placeholder="Anything else you'd like us to know before we speak?"
                value={state.invite.annotation}
                onChange={e => setInviteField('annotation', e.target.value)}
                rows={8}
              />
              <button
                className={`annotation-tool invite-form__mic${isRecording ? ' recording' : ''}`}
                onClick={toggleRecording}
                title={isRecording ? 'Stop recording' : 'Speak your thoughts'}
                aria-label={isRecording ? 'Stop recording' : 'Speak your thoughts'}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{isRecording ? 'Stop' : 'Speak'}</span>
              </button>
            </div>

            <p className="invite-form__note">
              All responses are exported as a structured file — nothing is sent automatically.
              You share it when and how you choose.
            </p>

            <button className="export-btn" onClick={exportEngagement}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M7.5 1v9M3.5 6l4 4 4-4M1.5 12.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export your engagement
            </button>
          </div>
        </div>

        <div className="invite-footnote">
          <div className="invite-footnote__logos">
            <img src="https://d3e64cxw1rkxsu.cloudfront.net/Tarento_logo_efeb39d3b6.svg" alt="Tarento" className="invite-footnote__logo" style={{ height: '44px' }} />
            <span className="invite-footnote__sep">&times;</span>
            <img src="https://www.hectorrail.com/wp-content/uploads/2022/04/logo-svart.svg" alt="Hector Rail" className="invite-footnote__logo" style={{ height: '26px' }} />
          </div>
          <div className="invite-footnote__thesis">
            <div className="invite-footnote__thesis-label">Core thesis</div>
            <div className="invite-footnote__tagline">
              "How would this organisation operate differently<br />
              if AI were native to how it works?"
            </div>
          </div>
        </div>

        <div className="invite-privacy-link">
          <button
            className="privacy-trigger"
            onClick={() => setPrivacyOpen(true)}
            aria-label="Open privacy and data information"
          >
            <Lock size={11} strokeWidth={1.5} />
            <span>Privacy &amp; data</span>
          </button>
        </div>

        <PrivacyPanel open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      </div>
    </section>
  )
}
