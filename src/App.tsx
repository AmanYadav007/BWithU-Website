import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Alive } from './sections/Alive'
import { ComingNext } from './sections/ComingNext'
import { Demo } from './sections/Demo'
import { FAQ } from './sections/FAQ'
import { Features } from './sections/Features'
import { GetB } from './sections/GetB'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Privacy } from './sections/Privacy'

export default function App() {
  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero />
        <Demo />
        <Features />
        <Alive />
        <HowItWorks />
        <Privacy />
        <ComingNext />
        <FAQ />
        <GetB />
      </main>
      <Footer />
    </>
  )
}
