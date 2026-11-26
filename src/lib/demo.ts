import { site } from './site'

/**
 * The 30-second test call is the real call app, shown in an iframe (app.bwithu.live/#/demo?c=<id>) only after a tap.
 * The app tells this page one thing at a time: "ready" or "ended" and why. Never anything said in the call.
 */
export const DEMO_SECONDS = 30

/** VITE_APP_URL points the frame at a local app for testing; production uses the real one. */
const appBase: string = import.meta.env.VITE_APP_URL || site.app

export const demoOrigin = new URL(appBase).origin

export const demoUrl = (faceId: string) => `${appBase.replace(/\/$/, '')}/#/demo?c=${encodeURIComponent(faceId)}`

export { parseDemoMessage, type DemoEvent } from './demoMessage'
