import { createContext, useContext, useState, useCallback } from 'react'

const EngagementContext = createContext(null)

const initialState = {
  position:  { reactions: [], annotation: '' },
  backbone:  { reactions: [], annotation: '' },
  stance:    { reactions: [], annotation: '' },
  timeLogic: { reactions: [], annotation: '' },
  hypotheses: {
    h1: null, h2: null, h3: null,
    annotation: ''
  },
  invite: { annotation: '' }
}

export function EngagementProvider({ children }) {
  const [state, setState] = useState(initialState)

  const toggleReaction = useCallback((section, reaction) => {
    setState(prev => {
      const reactions = prev[section].reactions
      const has = reactions.includes(reaction)
      return {
        ...prev,
        [section]: {
          ...prev[section],
          reactions: has ? reactions.filter(r => r !== reaction) : [...reactions, reaction]
        }
      }
    })
  }, [])

  const setAnnotation = useCallback((section, value) => {
    setState(prev => ({
      ...prev,
      [section]: { ...prev[section], annotation: value }
    }))
  }, [])

  const setHypothesisResponse = useCallback((hyp, response) => {
    setState(prev => ({
      ...prev,
      hypotheses: {
        ...prev.hypotheses,
        [hyp]: prev.hypotheses[hyp] === response ? null : response
      }
    }))
  }, [])

  const setHypothesisAnnotation = useCallback((value) => {
    setState(prev => ({
      ...prev,
      hypotheses: { ...prev.hypotheses, annotation: value }
    }))
  }, [])

  const setInviteField = useCallback((field, value) => {
    setState(prev => ({
      ...prev,
      invite: { ...prev.invite, [field]: value }
    }))
  }, [])

  const computeProgress = useCallback(() => {
    let engaged = 0
    const contentSections = ['position', 'backbone', 'stance', 'timeLogic']
    contentSections.forEach(s => {
      if (state[s].reactions.length > 0 || state[s].annotation.trim()) engaged++
    })
    const hyps = ['h1', 'h2', 'h3']
    hyps.forEach(h => { if (state.hypotheses[h] !== null) engaged++ })
    if (state.hypotheses.annotation.trim()) engaged++
    return Math.round((engaged / 9) * 100)
  }, [state])

  const exportEngagement = useCallback(() => {
    const reactionLabels = {
      resonates: 'This resonates',
      discuss: 'Want to discuss',
      thoughts: 'We have thoughts',
      priority: 'High priority'
    }
    const hypoLabels = {
      'spot-on': 'Spot on',
      'partially-true': 'Partially true',
      'differently': 'We see it differently',
      'tell-more': 'Tell us more'
    }

    const date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    })

    const WIDE  = '════════════════════════════════════════════════════════'
    const THIN  = '────────────────────────────────────────────────────────'
    const BLANK = ''

    const renderSection = (title, reactions, annotation) => {
      const lines = [title, THIN]
      if (reactions.length > 0) {
        lines.push(`Reactions:  ${reactions.join('  ·  ')}`)
        lines.push(BLANK)
      }
      if (annotation && annotation.trim()) {
        lines.push('Notes:')
        lines.push(annotation.trim())
        lines.push(BLANK)
      }
      if (reactions.length === 0 && (!annotation || !annotation.trim())) {
        lines.push('No engagement recorded for this section.')
        lines.push(BLANK)
      }
      return lines.join('\n')
    }

    const hypothesisRows = [
      { label: '01  Network intelligence & positioning', key: 'h1' },
      { label: '02  Capacity pricing & commercial decisions', key: 'h2' },
      { label: '03  Institutional knowledge as strategic asset', key: 'h3' },
    ]

    const padRight = (str, len) => str + ' '.repeat(Math.max(0, len - str.length))

    const txt = [
      'AI-NATIVE STRATEGY — ENGAGEMENT SUMMARY',
      `Prepared by Tarento  ·  Exported ${date}`,
      WIDE,
      BLANK,
      'This document captures the reactions, notes, and responses recorded while',
      'reading the Tarento point of view on AI-native strategy. It is intended as',
      'a starting point for the conversation that follows.',
      BLANK,
      WIDE,
      BLANK,
      renderSection(
        '01 — POSITION',
        state.position.reactions.map(r => reactionLabels[r]),
        state.position.annotation
      ),
      WIDE,
      BLANK,
      renderSection(
        '02 — STRAWMAN ARCHITECTURE',
        state.backbone.reactions.map(r => reactionLabels[r]),
        state.backbone.annotation
      ),
      WIDE,
      BLANK,
      renderSection(
        '03 — ENABLE / EXTEND / ENGINEER',
        state.stance.reactions.map(r => reactionLabels[r]),
        state.stance.annotation
      ),
      WIDE,
      BLANK,
      renderSection(
        '04 — NOW / NEXT / LATER',
        state.timeLogic.reactions.map(r => reactionLabels[r]),
        state.timeLogic.annotation
      ),
      WIDE,
      BLANK,
      '05 — HYPOTHESES',
      THIN,
      ...hypothesisRows.map(({ label, key }) => {
        const response = state.hypotheses[key]
        return `${padRight(label, 50)}${response ? hypoLabels[response] : '—'}`
      }),
      BLANK,
      ...(state.hypotheses.annotation && state.hypotheses.annotation.trim()
        ? ['Overall response:', state.hypotheses.annotation.trim(), BLANK]
        : ['No overall notes recorded.', BLANK]
      ),
      WIDE,
      BLANK,
      '06 — CLOSING THOUGHTS',
      THIN,
      ...(state.invite.annotation && state.invite.annotation.trim()
        ? [state.invite.annotation.trim(), BLANK]
        : ['Nothing recorded.', BLANK]
      ),
      WIDE,
      BLANK,
      'Prepared by Tarento  ·  tarento.com',
    ].join('\n')

    const blob = new Blob([txt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-native-strategy-engagement.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [state])

  return (
    <EngagementContext.Provider value={{
      state,
      toggleReaction,
      setAnnotation,
      setHypothesisResponse,
      setHypothesisAnnotation,
      setInviteField,
      computeProgress,
      exportEngagement
    }}>
      {children}
    </EngagementContext.Provider>
  )
}

export const useEngagement = () => useContext(EngagementContext)
