import type { CompanionState } from '../pixel/types'

export type DisplayKind = 'weather' | 'search' | 'info' | 'tab_picker' | 'confirmation' | 'memory'

export type Display = { kind: DisplayKind; title: string; lines: string[] }

export type Beat = {
  state: CompanionState
  user?: string
  bot?: string
  display?: Display
  ms: number
}

export type Scenario = { id: string; prompt: string; icon: string; beats: Beat[] }

/*
 * Scripted conversations for the site. Every one maps to something the extension really
 * does: read open tabs, search the web, switch tabs (with a confirm), remember things,
 * and the warm "gentle nudge" personality from its system prompt.
 */
export const scenarios: Scenario[] = [
  {
    id: 'page',
    prompt: 'What’s this article about?',
    icon: 'file',
    beats: [
      { state: 'listen', user: 'What’s this article about?', ms: 1600 },
      { state: 'think', user: 'What’s this article about?', bot: 'Reading your tab…', ms: 1500 },
      {
        state: 'talk',
        bot: 'It’s about sleeping better. Short version: same bedtime, less screen, no coffee after two.',
        display: { kind: 'info', title: 'The 3-step reset', lines: ['Same bedtime, even weekends', 'Screens off 30 min before', 'No caffeine after 2 PM'] },
        ms: 4600,
      },
    ],
  },
  {
    id: 'weather',
    prompt: 'Do I need an umbrella today?',
    icon: 'cloud',
    beats: [
      { state: 'listen', user: 'Do I need an umbrella today?', ms: 1500 },
      { state: 'searching', user: 'Do I need an umbrella today?', bot: 'Let me look that up…', ms: 1600 },
      {
        state: 'talk',
        bot: 'Yes, take one. Light rain starts around four.',
        display: { kind: 'weather', title: 'Mumbai · Today', lines: ['28° · Light rain', 'Rain from 4 PM', 'Humidity 82%'] },
        ms: 4200,
      },
    ],
  },
  {
    id: 'nudge',
    prompt: 'Just one more video…',
    icon: 'heart',
    beats: [
      { state: 'listen', user: 'Just one more video, then I’ll work.', ms: 1700 },
      { state: 'curious', user: 'Just one more video, then I’ll work.', ms: 1200 },
      { state: 'talk', bot: 'You said that an hour ago. Stretch, drink some water, then finish the deck.', ms: 3800 },
      { state: 'happy', bot: 'I’m proud of you. You’ve got this!', ms: 2400 },
    ],
  },
  {
    id: 'tabs',
    prompt: 'Take me to my Figma tab',
    icon: 'tabs',
    beats: [
      { state: 'listen', user: 'Take me to my Figma tab.', ms: 1500 },
      { state: 'think', user: 'Take me to my Figma tab.', bot: 'Checking your tabs…', ms: 1300 },
      {
        state: 'talk',
        bot: 'Found it. Want me to switch?',
        display: { kind: 'confirmation', title: 'Switch tab?', lines: ['Landing page v3 — Figma'] },
        ms: 2800,
      },
      { state: 'happy', bot: 'Done. Back to it!', ms: 2200 },
    ],
  },
  {
    id: 'news',
    prompt: 'What’s new in AI today?',
    icon: 'search',
    beats: [
      { state: 'listen', user: 'What’s new in AI today?', ms: 1500 },
      { state: 'searching', user: 'What’s new in AI today?', bot: 'Searching the web…', ms: 1700 },
      {
        state: 'talk',
        bot: 'Three things stood out. I put them on the screen for you.',
        display: { kind: 'search', title: 'Found this', lines: ['New open model tops coding charts', 'Chrome adds on-device AI APIs', 'Study: voice assistants and focus'] },
        ms: 4400,
      },
    ],
  },
  {
    id: 'memory',
    prompt: 'Remember my exam is Friday',
    icon: 'brain',
    beats: [
      { state: 'listen', user: 'Remember my exam is on Friday.', ms: 1500 },
      {
        state: 'talk',
        bot: 'Got it. I’ll keep Friday in mind. One chapter a day and you’re set.',
        display: { kind: 'memory', title: 'I remember', lines: ['Big exam on Friday'] },
        ms: 3800,
      },
      { state: 'happy', bot: 'You’ve got this!', ms: 1800 },
    ],
  },
]

export const heroScenarios = ['page', 'weather', 'nudge'].map((id) => scenarios.find((s) => s.id === id)!)
