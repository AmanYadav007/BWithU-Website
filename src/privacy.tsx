import { StrictMode } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { site } from './lib/site'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{title}</h2>
      <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink-2 [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_a]:text-cyan [&_a]:underline-offset-4 hover:[&_a]:underline">
        {children}
      </div>
    </section>
  )
}

/** Kept in sync with the extension's public/privacy.html (Chrome Web Store listing). */
function Privacy() {
  return (
    <>
      <Background />
      <Nav />
      <main className="container-x max-w-[760px] pt-36 pb-24">
        <p className="eyebrow">Privacy</p>
        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em]">Privacy Policy</h1>
        <p className="mt-3 text-[15px] text-ink-3">Last updated: September 25, 2026</p>
        <p className="mt-8 text-[18px] leading-relaxed text-ink-2">
          BwithU (“B”) is a voice companion that lives in your browser. This policy explains what data B uses, where it goes, and what we never do with it.
        </p>

        <div className="mt-12 space-y-10">
          <Section title="What B uses and why">
            <ul>
              <li><strong>Microphone audio</strong>: only while you have the mic turned on. Audio is streamed to our AI provider to understand you and generate B’s spoken reply. We do not record or store your audio.</li>
              <li><strong>Page content from your open tabs</strong>: when you talk to B, it reads the title, address, and visible text of your open tabs (up to 12) so it can answer questions about what you’re looking at. This text is sent to our AI provider with your message and is not stored by us.</li>
              <li><strong>Your messages</strong>: text you type or say is sent to our AI provider to generate a reply.</li>
              <li><strong>Search queries</strong>: when you ask about news, weather, or other current information, a short search query is sent to our search provider.</li>
              <li><strong>A random install ID and your IP address</strong>: used only to enforce daily usage limits and prevent abuse. Counters are deleted automatically after 48 hours.</li>
            </ul>
          </Section>

          <Section title="What stays on your device">
            <p>Your settings, B’s name, recent conversation history, and the “memory” B keeps about you (for example, your name) are stored locally in your browser’s extension storage. You can clear them at any time by removing the extension.</p>
          </Section>

          <Section title="Who processes your data">
            <ul>
              <li><strong>xAI</strong>: AI conversation, speech recognition, and voice (<a href="https://x.ai/legal/privacy-policy" target="_blank" rel="noopener">privacy policy</a>).</li>
              <li><strong>Tavily</strong> or <strong>Brave Search</strong>: web search results.</li>
              <li><strong>Vercel</strong> and <strong>Upstash</strong>: hosting of our API relay and usage counters.</li>
            </ul>
            <p>These providers process data only to deliver the service to you.</p>
          </Section>

          <Section title="What we never do">
            <ul>
              <li>We do not sell or rent your data.</li>
              <li>We do not use your data for advertising or to build profiles about you.</li>
              <li>We do not use or transfer your data for purposes unrelated to B’s core features, and we do not use it to determine creditworthiness or for lending.</li>
              <li>We do not access pages or your microphone when you are not using B.</li>
            </ul>
            <p>BwithU’s use of information complies with the Chrome Web Store User Data Policy, including the Limited Use requirements.</p>
          </Section>

          <Section title="Children">
            <p>BwithU is not directed at children under 13, and we do not knowingly collect their data.</p>
          </Section>

          <Section title="Changes and contact">
            <p>
              If this policy changes, we’ll update the date above. Questions or deletion requests: <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Privacy />
  </StrictMode>,
)
