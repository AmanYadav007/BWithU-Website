/** Every external link lives here. */
export const site = {
  name: 'BwithU',
  tagline: 'Your AI companion, always with you.',
  url: 'https://bwithu.live',
  /** The call app. Faces and voices can be preselected with ?face= and ?voice=. */
  app: 'https://app.bwithu.live/',
  privacy: 'https://app.bwithu.live/ui/privacy.html',
  terms: 'https://app.bwithu.live/ui/terms.html',
  email: 'hello@bwithu.live',
  x: 'https://x.com/BwithUAI',
  /** Free talk time per person per day and per call (matches the app's limits). */
  freeMinutes: 10,
  /**
   * Google Apps Script web-app URL that appends signups to the waitlist sheet (google-sheets/waitlist.gs).
   * Public by design (it ships in the page). VITE_SHEETS_URL overrides it, e.g. for a test sheet.
   */
  sheetsUrl:
    import.meta.env.VITE_SHEETS_URL ||
    'https://script.google.com/macros/s/AKfycbx6ft9FO45LQGp8IardW7zjmyBbViBwHDbMH3LTWn9WX9PDW-lTZMpbNIPlbExpxCQq/exec',
} as const

export function appLink(params: { face?: string; voice?: string } = {}) {
  const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]).toString()
  return query ? `${site.app}?${query}` : site.app
}
