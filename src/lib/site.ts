/**
 * Every external link and launch switch lives here, so going live
 * on the Chrome Web Store is a one-line change.
 */
export const site = {
  name: 'BwithU',
  tagline: 'Your AI companion, always with you.',
  url: 'https://bwithu.ai',
  email: 'hello@bwithu.app',
  github: 'https://github.com/AmanYadav007/bwithu-extension',
  x: 'https://x.com/BwithUAI',
  /** Set to the Chrome Web Store listing once published. Empty = beta / waitlist mode. */
  chromeStoreUrl: '',
  /**
   * Google Apps Script web-app URL that appends signups to the waitlist sheet (google-sheets/waitlist.gs).
   * Public by design (it ships in the page). VITE_SHEETS_URL overrides it, e.g. for a test sheet.
   */
  sheetsUrl:
    import.meta.env.VITE_SHEETS_URL ||
    'https://script.google.com/macros/s/AKfycbx6ft9FO45LQGp8IardW7zjmyBbViBwHDbMH3LTWn9WX9PDW-lTZMpbNIPlbExpxCQq/exec',
} as const

export const isLive = site.chromeStoreUrl.length > 0
export const installHref = isLive ? site.chromeStoreUrl : '#get-b'
export const installLabel = isLive ? 'Add to Chrome' : 'Get early access'
