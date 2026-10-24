import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Faces } from './sections/Faces'
import { FAQ } from './sections/FAQ'
import { Features } from './sections/Features'
import { FinalCTA } from './sections/FinalCTA'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Privacy } from './sections/Privacy'
import { Voices } from './sections/Voices'
import { YourOwn } from './sections/YourOwn'

export default function App() {
  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero />
        <Features />
        <Faces />
        <Voices />
        <HowItWorks />
        <YourOwn />
        <Privacy />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
