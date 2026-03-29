import { createContext, useContext, useState, useCallback } from 'react'

const EngagementContext = createContext(null)

const initialState = {
  position:  { reactions: [], annotation: '' },
  backbone:  { reactions: [], annotation: '' },
  stance:    { reactions: [], annotation: '' },
  timeLogic: { reactions: [], annotation: '' },
  hypotheses: {
    h1: null, h2: null, h3: null, h4: null, h5: null,
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
    const hyps = ['h1', 'h2', 'h3', 'h4', 'h5']
    hyps.forEach(h => { if (state.hypotheses[h] !== null) engaged++ })
    if (state.hypotheses.annotation.trim()) engaged++
    return Math.round((engaged / 11) * 100)
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
    const data = {
      document: 'AI-Native Strategy — Strawman Architecture',
      exportedAt: new Date().toISOString(),
      sectionEngagement: {
        '01 — Position': {
          reactions: state.position.reactions.map(r => reactionLabels[r]),
          annotation: state.position.annotation || null
        },
        '02 — Strawman Architecture': {
          reactions: state.backbone.reactions.map(r => reactionLabels[r]),
          annotation: state.backbone.annotation || null
        },
        '03 — Stance': {
          reactions: state.stance.reactions.map(r => reactionLabels[r]),
          annotation: state.stance.annotation || null
        },
        '04 — Time Logic': {
          reactions: state.timeLogic.reactions.map(r => reactionLabels[r]),
          annotation: state.timeLogic.annotation || null
        }
      },
      hypotheses: {
        '01 — Real-time network intelligence': state.hypotheses.h1 ? hypoLabels[state.hypotheses.h1] : null,
        '02 — Commercial decision-making': state.hypotheses.h2 ? hypoLabels[state.hypotheses.h2] : null,
        '03 — Institutional knowledge at risk': state.hypotheses.h3 ? hypoLabels[state.hypotheses.h3] : null,
        '04 — Decision architecture barrier': state.hypotheses.h4 ? hypoLabels[state.hypotheses.h4] : null,
        '05 — Human boundaries matter': state.hypotheses.h5 ? hypoLabels[state.hypotheses.h5] : null,
        annotation: state.hypotheses.annotation || null
      },
      closingThoughts: state.invite.annotation || null
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-native-pov-engagement.json'
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
