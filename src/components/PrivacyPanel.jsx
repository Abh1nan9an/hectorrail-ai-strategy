import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, HardDrive, Mic, Globe } from 'lucide-react'

export default function PrivacyPanel({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return createPortal(
    <>
      <div
        className={`response-aid-backdrop${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`response-aid privacy-panel${open ? ' open' : ''}`}
        role="dialog"
        aria-label="Privacy & data"
        aria-modal="false"
      >
        <div className="response-aid__header">
          <div>
            <h3 className="response-aid__title">Privacy &amp; data</h3>
            <p className="response-aid__subtitle">
              How this tool handles everything you type, speak, and select
              while&nbsp;using&nbsp;it.
            </p>
          </div>
          <button className="response-aid__close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="response-aid__body privacy-panel__body">
          <div className="privacy-panel__section">
            <div className="privacy-panel__icon">
              <HardDrive size={17} strokeWidth={1.5} />
            </div>
            <div className="privacy-panel__content">
              <div className="privacy-panel__heading">
                Your content never leaves your device
              </div>
              <p className="privacy-panel__text">
                Everything you select, type, or record in this tool is held in
                your browser's memory only. There is no database, no server,
                and no user account. If you close the tab, the content is gone
                — by design.
              </p>
              <p className="privacy-panel__text">
                The export button generates a text file directly on your machine.
                Nothing is transmitted to Tarento or anyone else unless you
                choose to share that file.
              </p>
            </div>
          </div>

          <div className="privacy-panel__divider" />

          <div className="privacy-panel__section">
            <div className="privacy-panel__icon">
              <Mic size={17} strokeWidth={1.5} />
            </div>
            <div className="privacy-panel__content">
              <div className="privacy-panel__heading">
                Voice input — one thing to know
              </div>
              <p className="privacy-panel__text">
                The microphone feature uses your browser's built-in speech
                service. In Chrome and Edge, spoken words are briefly processed
                by Google's servers to produce the transcription — this is a
                standard browser capability, not something Tarento controls or
                has access to.
              </p>
              <p className="privacy-panel__text">
                In Safari, speech processing happens entirely on your device.
                If you'd prefer to keep voice input fully local, use Safari —
                or simply type instead. The tool works identically either way.
              </p>
            </div>
          </div>

          <div className="privacy-panel__divider" />

          <div className="privacy-panel__section">
            <div className="privacy-panel__icon">
              <Globe size={17} strokeWidth={1.5} />
            </div>
            <div className="privacy-panel__content">
              <div className="privacy-panel__heading">
                Hosted on GitHub Pages
              </div>
              <p className="privacy-panel__text">
                This page is served as a static site via GitHub Pages. GitHub
                hosts the code — the HTML, styles, and logic — and can see that
                someone visited the URL, as any web server would. It has no
                visibility into what you typed, selected, or said.
              </p>
              <p className="privacy-panel__text">
                Your engagement content never reaches GitHub's infrastructure.
                The only external request the page makes on load is to fetch
                typefaces from Google Fonts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
