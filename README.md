# AI-Native Strategy — Strawman Architecture

An interactive strategic thought canvas built for [Hector Rail](https://www.hectorrail.com), presenting a point of view on what it means to become AI-native — not as a pitch, but as a provocation worth responding to.

Built by [Tarento](https://tarento.com) as a Beat 1 deliverable for the AI-Native Strategy sprint.

**Live site → https://hectorrail-ai-strategy.tarentoinitiatives.com/**

---

## What this is

This is not a slide deck. It is a web-based strategic artefact designed to:

- Present a structured point of view on AI-native strategy
- Invite Hector Rail's leadership to react, challenge, and refine the thinking
- Capture that engagement (reactions, annotations, voice notes) and export it as a structured file

The core intellectual architecture is a **strawman** — deliberately incomplete, designed to be stress-tested.

---

## The eight-layer architecture

| # | Layer | What it addresses |
|---|---|---|
| 01 | Strategic Advantage | Where AI changes the competitive logic of the business |
| 02 | AI Modality Strategy | When to use GenAI vs classical ML vs automation vs knowledge graphs |
| 03 | Decision Architecture | Which decisions stay human, which become AI-assisted, and who decides |
| 04 | Work & Workflow Redesign | How workflows need to be rethought around human + AI collaboration |
| 05 | Functional Operating Response | How each major function needs to operate differently |
| 06 | People, Leadership & Capability | What changes for leaders, managers, and employees |
| 07 | Operating Model & Governance | Ownership, accountability, safeguards, and execution model |
| 08 | Intelligence & Foundations | Data infrastructure, integration fabric, and the platforms everything runs on |

---

## Sections

| Section | Content |
|---|---|
| Cover | AI-Native Strategy — the framing question |
| 01 — Position | Designing for AI vs adding AI |
| 02 — Strawman Architecture | The eight-layer architecture (expandable accordion) |
| 03 — Stance | Enable, Extend, Engineer — three intervention types |
| 04 — Time Logic | Now, Next, Later — sequencing logic and boundary conditions |
| 05 — Hypotheses | Three working hypotheses specific to Hector Rail |
| 06 — Invite | Closing thoughts, export, and invitation to continue the conversation |

---

## Engagement features

Every section supports:

- **Reactions** — This resonates / Want to discuss / We have thoughts / High priority
- **Annotations** — Typed or spoken (via Web Speech API)
- **Help me respond** — A guided response panel with universal and section-specific prompts, each supporting voice capture or one-click prompt insertion
- **Export** — All engagement data exports as a structured plain-text (`.txt`) file, readable and editable in any text editor
- **Privacy & data** — A transparent data notice (accessible from the footer) covering browser-only storage, voice input handling, and GitHub Pages hosting

---

## Tech stack

- **Framework:** Vite + React 18
- **Styling:** Vanilla CSS with custom properties (design tokens), no CSS-in-JS
- **Icons:** Lucide React
- **Fonts:** Montserrat + Open Sans (Google Fonts)
- **State:** React Context (`EngagementContext`) — in-memory only, no persistence
- **Voice:** Web Speech API (Chrome-optimised; on-device in Safari)
- **Portals:** React `createPortal` for side panels, to escape CSS transform containment
- **Deployment:** GitHub Pages (auto-deploy on push to `main`)

---

## Running locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Building

```bash
npm run build
# → dist/
```

---

## Brand

Dual-branded: [Tarento](https://tarento.com) × [Hector Rail](https://www.hectorrail.com).

- Tarento navy `#16283C`, teal `#1E8F8E`
- Hector Rail yellow `#FAB900`, black, white

---

## Status

Production-ready. Presented to Hamid (Global CIO, [Hector Rail](https://www.hectorrail.com)) as the opening artefact of the AI-Native Strategy engagement. Designed to be shared with the broader Hector Rail leadership team as Hamid sees fit — the engagement and export features are built precisely for that wider conversation.
