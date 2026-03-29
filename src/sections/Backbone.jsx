import { useState, useEffect } from 'react'
import { useInView } from '../hooks'
import { Crosshair, GitBranch, RefreshCw, Building2, Shield, Users, Brain, Database } from 'lucide-react'
import InteractionBar from '../components/InteractionBar'

const DIMENSIONS = [
  {
    num: '01',
    title: 'Strategic Advantage',
    teaser: 'Where AI changes the competitive logic of the business',
    Icon: Crosshair,
    desc: 'Where can AI create structural advantage — not just efficiency, but better operating leverage, decision quality, resilience, or customer value? This is not \u201cwhere can AI help?\u201d It is \u201cwhere does AI change the competitive logic of this business?\u201d — and which of those shifts are available to you before they are available to\u00a0everyone.',
    key: 'The unit of analysis is competitive position, not process\u00a0improvement.'
  },
  {
    num: '02',
    title: 'AI Modality Strategy',
    teaser: 'Generative AI, classical AI, automation, and knowledge systems',
    Icon: Brain,
    desc: 'Not all AI is the same — and knowing which type fits where is a strategic decision, not a technical one. Generative AI excels at content, synthesis, and unstructured reasoning. Classical ML handles prediction, classification, and pattern detection. Automation (RPA, rules engines) suits repeatable, well-defined tasks. Knowledge graphs and retrieval systems make institutional knowledge accessible and contextual. The right architecture maps each of these to the problems they actually solve — and avoids the trap of applying generative AI to everything simply because it is\u00a0new.',
    key: 'The question is not "should we use AI?" but "which kind of AI, where, and why?"'
  },
  {
    num: '03',
    title: 'Decision Architecture',
    teaser: 'Making decision rights and methods a conscious design choice',
    Icon: GitBranch,
    desc: 'Which decisions should remain fully human, become AI-assisted, or become partially automated — and who decides? This is about making decision rights and decision methods a conscious design choice rather than inherited habit. Most organisations have never examined their decision architecture. AI makes that examination\u00a0urgent.',
    key: 'The question is not "can AI make this decision?" but "should it, and under what conditions?"'
  },
  {
    num: '04',
    title: 'Work & Workflow Redesign',
    teaser: 'Redesigning workflows with human + AI collaboration as the default',
    Icon: RefreshCw,
    desc: 'Which workflows should be enabled, rethought, or fundamentally rebuilt around human + AI collaboration? Not \u201cwhat can we automate\u201d but \u201cif we designed this workflow today with AI as a given, what would it look like?\u201d The answer is often radically different — different steps, different roles, different\u00a0timing.',
    key: 'Workflow redesign is where strategic intent becomes operational\u00a0reality.'
  },
  {
    num: '05',
    title: 'Functional Operating Response',
    teaser: 'How each major function needs to operate differently',
    Icon: Building2,
    desc: 'How should each major function respond — operations, commercial, finance, HR, safety, technology? This forces concreteness but is not a function-by-function use-case mapping. It asks: given the shifts underway, how does each function need to operate differently? What new capabilities are required? What existing practices become\u00a0obsolete?',
    key: 'The response is not uniform across functions — each has a different starting point and a different\u00a0horizon.'
  },
  {
    num: '06',
    title: 'People, Leadership & Capability',
    teaser: 'What changes for leaders, managers, and employees',
    Icon: Users,
    desc: 'What changes for leaders, managers, employees — in roles, skills, incentives, and behaviour? Becoming AI-native is fundamentally a cultural shift. Leaders must model AI-native behaviour, not just mandate it. Middle managers, historically the greatest source of organisational friction, become either the accelerant or the blocker. Capability is not just\u00a0technical.',
    key: 'The bottleneck is rarely technology. It is almost always leadership behaviour and managerial\u00a0habits.'
  },
  {
    num: '07',
    title: 'Operating Model & Governance',
    teaser: 'Ownership, accountability, safeguards, and execution model',
    Icon: Shield,
    desc: 'What ownership, governance, prioritisation, safeguards, and execution model are needed? Who is accountable when AI systems make mistakes? How do you audit AI-informed decisions? How do you maintain human oversight without neutralising the speed advantages AI provides? Governance that gets this wrong either creates risk or kills\u00a0adoption.',
    key: 'Governance is not a constraint on AI adoption — it is what makes adoption\u00a0sustainable.'
  },
  {
    num: '08',
    title: 'Intelligence & Foundations',
    teaser: 'Data infrastructure, integration fabric, and the platforms everything else runs on',
    Icon: Database,
    desc: 'None of the above layers work without the right foundations — data infrastructure, integration fabric, AI platforms, and the connective tissue that lets intelligence flow across the organisation. This is not a traditional IT modernisation agenda. It is about ensuring data is accessible, governed, and AI-ready; that systems can exchange context, not just transactions; and that the platforms underneath can support experimentation at speed without creating technical debt that slows you down\u00a0later.',
    key: 'Foundations are not a prerequisite to be completed first — they evolve in lockstep with the layers\u00a0above.'
  },
]

export default function Backbone({ onEnterView }) {
  const [ref, inView] = useInView()
  const [openItem, setOpenItem] = useState(null)

  useEffect(() => {
    if (inView) onEnterView?.('backbone')
  }, [inView, onEnterView])

  const toggle = (num) => setOpenItem(prev => prev === num ? null : num)

  return (
    <section id="backbone" className="section" ref={ref}>
      <div className={`section__inner${inView ? ' in-view' : ''}`}>
        <div className="section__number">02 — Strawman Architecture</div>
        <h2 className="section__heading">
          Eight layers of a <em>strawman architecture for AI‑native&nbsp;strategy.</em>
        </h2>

        <p className="backbone-intro">
          This is not a finished blueprint — it is a strawman designed to be stress-tested.
          Eight layers that together form a coherent architecture for becoming AI-native.
          Not to be addressed sequentially, but coherently, with each&nbsp;layer
          shaping the&nbsp;others.
        </p>

        <div className="accordion" role="list">
          {DIMENSIONS.map(({ num, title, teaser, desc, key, Icon }) => {
            const isOpen = openItem === num
            return (
              <div
                key={num}
                className={`accordion-item${isOpen ? ' open' : ''}`}
                role="listitem"
              >
                <button
                  className="accordion-item__trigger"
                  onClick={() => toggle(num)}
                  aria-expanded={isOpen}
                  aria-label={`${title}: ${teaser}`}
                >
                  <span className="accordion-item__num">{num}</span>
                  <Icon size={18} strokeWidth={1.5} className="accordion-item__icon" />
                  <span className="accordion-item__title">{title}</span>
                  <svg
                    className="accordion-item__arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="accordion-item__body" aria-hidden={!isOpen}>
                  <div className="accordion-item__content">
                    <p className="accordion-item__desc">{desc}</p>
                    <p className="accordion-item__key">{key}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <InteractionBar section="backbone" />
      </div>
    </section>
  )
}
