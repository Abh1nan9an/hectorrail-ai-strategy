/**
 * Prompt sets for the Response Aid panel.
 * Each section gets universal + section-specific prompts.
 * Only the first 3 specific prompts show by default; the rest behind "Show more".
 */

const RESPONSE_PROMPTS = {
  position: {
    label: 'Core Perspective',
    universal: [
      'What resonates most here?',
      'Where would you challenge or refine this\u00a0perspective?',
    ],
    specific: [
      'In Hector Rail\u2019s context, where are we still thinking in terms of adding AI rather than designing for\u00a0it?',
      'If AI were treated as a given, what part of the business would need to be rethought\u00a0first?',
      'What in the current operating model is most likely to limit this way of\u00a0thinking?',
      'Where does this perspective feel too idealistic, and where does it feel uncomfortably\u00a0true?',
      'What existing strengths should this thinking build on rather than\u00a0replace?',
    ],
  },

  backbone: {
    label: 'Strawman Architecture',
    universal: [
      'What feels most relevant here?',
      'What feels missing, overlapping, or\u00a0unclear?',
    ],
    specific: [
      'Which of these layers feels most critical for Hector Rail to get right\u00a0first?',
      'Are there any layers that feel redundant, too abstract, or not useful\u00a0enough?',
      'Where do you see the biggest tension between these layers in\u00a0practice?',
      'Which layer is likely to have the highest strategic importance but the lowest current\u00a0readiness?',
      'If leadership had to focus on only two layers first, which would they be and\u00a0why?',
    ],
  },

  stance: {
    label: 'Enable / Extend / Engineer',
    universal: [
      'What feels realistic here?',
      'Where are we overcomplicating or underestimating the current\u00a0landscape?',
    ],
    specific: [
      'What can likely be enabled quickly using today\u2019s landscape with minimal\u00a0change?',
      'Where would lightweight extension create meaningful value without major\u00a0rebuilding?',
      'Where is deeper engineering genuinely necessary rather than just\u00a0desirable?',
      'What are we at risk of overengineering too\u00a0early?',
      'Where do current systems, data, or workflows already provide more leverage than we\u00a0assume?',
    ],
  },

  timeLogic: {
    label: 'Now / Next / Later',
    universal: [
      'What should happen first?',
      'What should clearly\u00a0wait?',
    ],
    specific: [
      'Which ideas feel like immediate moves versus later-stage\u00a0plays?',
      'What needs to be true before something shifts from later to next, or from next to\u00a0now?',
      'What would be a mistake to prioritise too\u00a0early?',
      'Where could early movement create momentum for more structural shifts\u00a0later?',
      'What deserves deliberate delay even if it looks attractive\u00a0today?',
    ],
  },

  hypotheses: {
    label: 'Hypotheses',
    universal: [
      'What are we assuming here?',
      'Where are we likely wrong or\u00a0under-informed?',
    ],
    specific: [
      'Which assumptions feel strongest, and which feel least\u00a0grounded?',
      'What evidence would strengthen or weaken this\u00a0hypothesis?',
      'What context from Hector Rail would most change how we see\u00a0this?',
      'Which hypothesis should be tested first before we go any\u00a0further?',
      'What are we treating as obvious that may not actually be\u00a0true?',
    ],
  },
}

export default RESPONSE_PROMPTS
