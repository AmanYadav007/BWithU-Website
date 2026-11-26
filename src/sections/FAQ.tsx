
export const faqs = [
  {
    q: 'Is BwithU free?',
    a: 'Yes. Everyone gets 7 free minutes a day, and a single call can run up to 7 minutes. No card, no trial.',
  },
  {
    q: 'Do I need to download an app or make an account?',
    a: 'No. Open app.bwithu.live in your browser, pick a companion and start talking. There’s nothing to install or sign up for.',
  },
  {
    q: 'Is it a real person?',
    a: 'No. Your companion is an AI with a lifelike face and voice. It will always tell you it’s an AI if you ask.',
  },
  {
    q: 'Are my calls recorded?',
    a: 'No. Your voice is sent to our AI providers to understand you and reply in real time, and then it’s gone. We don’t store audio or transcripts.',
  },
  {
    q: 'Which devices work?',
    a: 'Chrome, Safari and Edge on phones, tablets and computers. Headphones give the smoothest conversation, so your companion doesn’t hear itself.',
  },
  {
    q: 'What languages can I speak?',
    a: 'English, Hindi and Hinglish, or Spanish. Pick your language before the call, and your companion talks with you in it, in a natural voice. In Hinglish they mix Hindi and English the way friends really do.',
  },
  {
    q: 'Can I make a companion from my own photo?',
    a: 'Soon. Join the list above and we’ll email you when it’s ready. Custom companions will be private to you.',
  },
]

/** Collapsed by default: the answers stay in the page for search engines, but the page stays quiet. */
export function FAQ() {
  return (
    <section id="faq" className="relative pb-16">
      <div className="container-x max-w-[720px]">
        <details className="group border-t border-line py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[15px] font-medium text-ink-3 hover:text-ink [&::-webkit-details-marker]:hidden">
            Questions
            <span aria-hidden className="text-[20px] transition-transform group-open:rotate-45">+</span>
          </summary>
          <ul>
            {faqs.map((f) => (
              <li key={f.q} className="border-t border-line py-5">
                <h3 className="text-[16px] font-semibold">{f.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  )
}
