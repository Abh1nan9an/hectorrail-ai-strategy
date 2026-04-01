import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from '../hooks'
import { Play, Pause, ExternalLink } from 'lucide-react'

const AUDIO_SRC = '/HectorRail-AIStrategy-AudioOverview-ByTarento.m4a'
const RESEARCH_URL = '/research.html'

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Listen({ onEnterView }) {
  const [ref, inView] = useInView()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (inView) onEnterView?.('listen')
  }, [inView, onEnterView])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
  }, [playing])

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current?.currentTime ?? 0)
  }, [])

  // Safari fires loadedmetadata reliably; Chrome/Firefox fire canplay.
  // Listen to both so the player unlocks on whichever arrives first.
  const handleReady = useCallback(() => {
    const dur = audioRef.current?.duration
    if (dur && isFinite(dur)) setDuration(dur)
    setLoaded(true)
  }, [])

  const handleCanPlay = handleReady

  const handleEnded = useCallback(() => {
    setPlaying(false)
    setCurrentTime(0)
    if (audioRef.current) audioRef.current.currentTime = 0
  }, [])

  const handleSeek = useCallback((e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const value = parseFloat(e.target.value)
    audio.currentTime = value
    setCurrentTime(value)
  }, [duration])

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <section id="listen" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">06</div>

        <h2 className="section__heading">
          A listening post — <em>how the space is moving.</em>
        </h2>

        <div className="listen-intro">
          <p>
            What follows is not a prescription. It is a signal — a curated listen
            on how organisations, practitioners, and thinkers are responding to
            the current wave of AI capability. The space is evolving quickly,
            and we find it more useful to hear how people are reasoning through
            it than to hand over a finished&nbsp;answer.
          </p>
          <p>
            We share this in the same spirit as the rest of this document: not
            to tell you what to do, but to give you a richer sense of the
            conversation that is already&nbsp;underway.
          </p>
        </div>

        <div className="audio-player">
          <audio
            ref={audioRef}
            src={AUDIO_SRC}
            preload="metadata"
            onLoadedMetadata={handleReady}
            onCanPlay={handleCanPlay}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={handleEnded}
          />

          <div className="audio-player__controls">
            <button
              className={`audio-player__play-btn${!loaded ? ' loading' : ''}`}
              onClick={togglePlay}
              disabled={!loaded}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause size={18} strokeWidth={1.8} /> : <Play size={18} strokeWidth={1.8} />}
            </button>

            <div className="audio-player__track">
              <input
                type="range"
                className="audio-player__progress"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime}
                onChange={handleSeek}
                disabled={!loaded}
                style={{ '--progress': `${progress}%` }}
                aria-label="Seek"
              />
            </div>

            <span className="audio-player__time">
              {loaded
                ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                : 'Loading…'}
            </span>
          </div>
        </div>

        <div className="listen-research-link">
          <a
            href={RESEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="research-link"
          >
            <ExternalLink size={13} strokeWidth={1.5} />
            <span>Read the supporting research</span>
          </a>
        </div>
      </div>
    </section>
  )
}
